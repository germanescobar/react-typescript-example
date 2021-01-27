import * as React from 'react'
import { RouteComponentProps } from "react-router";
import * as ReactMarkdown from 'react-markdown'
import Menu from './Menu'
import Loading from './components/Loading'
import curriculumService from './services/curriculum'
import { Section, Lesson } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBars } from '@fortawesome/free-solid-svg-icons'
const hljs = require('highlight.js')
require('highlight.js/styles/atom-one-dark.css')

interface State {
  loading?: boolean
  error?: Error
  lesson?: Lesson
  showMenu?: boolean
}

interface Props {
  sectionId?: string
  lessonId?: string
}

export default class LessonView extends React.Component<RouteComponentProps<Props>, State> {
  contentRef: React.RefObject<HTMLDivElement>
  sectionId: string
  lessonId: string

  constructor(props: RouteComponentProps<Props>) {
    super(props)

    this.state = { loading: true, error: null, lesson: null }
    this.contentRef = React.createRef()
  }

  async componentDidMount() {
    try {
      await this.fetchLesson()
      this.highlightCode()
    } catch (e) {
      console.log(e)
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname != this.props.location.pathname) {
      try {
        await this.fetchLesson()
        this.highlightCode()
      } catch (e) {
        console.log(e)
      }
    }
  }

  render() {
    const { loading, error, lesson } = this.state

    if (loading) return <Loading />
    if (error) return <p>Error :(</p>

    return (
      <div className="lesson-page">
        <div className="course-header">
          <div className="menu-toggle" onClick={this.toggleMenu}><FontAwesomeIcon icon={faBars} /></div>
          <div className="title">Fundamentos Desarrollo Web</div>
        </div>

        <div className="wrapper">
          <Menu sectionId={this.sectionId} lessonId={this.lessonId} show={this.state.showMenu} />
          <div className="content-wrapper" ref={this.contentRef}>
            <div className="content">
              <h1>{lesson.name}</h1>
              <ReactMarkdown
                  source={lesson.content}
                  escapeHtml={false}
                  linkTarget="_blank"
              />
              { this.renderFooter(lesson) }
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderFooter = (lesson: Lesson) => {
    return (
      <footer>
        { lesson.completed == true ?
          <div>
            <FontAwesomeIcon icon={faCheck} className="completed-icon" />
            <button className="btn btn-default" onClick={this.nextLesson}>Siguiente &nbsp;&rarr;</button>
          </div>
          :
          <button className="btn btn-primary" onClick={this.complete}>Completar y continuar &nbsp;&rarr;</button>
        }
      </footer>
    )
  }

  fetchLesson = async () => {
    const { sectionId, lessonId } = this.props.match.params

    try {
      const lesson: Lesson = await curriculumService.fetchLesson(sectionId, lessonId)
      this.setState({ loading: false, lesson })
    } catch (e) {
      this.setState({ loading: false, error: e })
    }
  }

  complete = async e => {
    e.preventDefault()

    const { sectionId, lessonId } = this.props.match.params

    curriculumService.completeLesson(sectionId, lessonId)
    this.goToNextLesson()
  }

  toggleMenu = e => this.setState(state => ({ ...state, showMenu: !state.showMenu }))

  nextLesson = async e => {
    e.preventDefault()
    this.goToNextLesson()
  }

  goToNextLesson = () => {
    const { history } = this.props
    const { sectionId, lessonId } = this.props.match.params

    const next = this.findNextLesson(curriculumService.getState(), sectionId, lessonId)
    if (next) {
      history.push(`/curriculum/${next.sectionId}/${next.lessonId}`)
    } else {
      const firstLesson = curriculumService.getState()[0].lessons[0]
      history.push(`/curriculum/${firstLesson.sectionId}/${firstLesson.id}`)
    }
  }

  findNextLesson = (sections: Section[], sectionId: string, lessonId: string): any => {
    const idx = sections.findIndex(s => s.id == sectionId)

    let section = sections[idx]
    const lessonIdx = section.lessons.findIndex(l => l.id == lessonId)

    let lesson: Lesson
    if (lessonIdx + 1 < section.lessons.length) {
      lesson = sections[idx].lessons[lessonIdx + 1]
    } else if (idx + 1 < sections.length) {
      let found = false
      for (let i = idx + 1; i < sections.length && !found; i++) {
        if (sections[i].lessons.length > 0) {
          section = sections[idx + 1]
          lesson = section.lessons[0]
          found = true
        }
      }
    }

    return lesson ? { sectionId: section.id, lessonId: lesson.id } : null
  }

  highlightCode = () => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
