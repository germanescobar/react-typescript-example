import * as React from "react"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import curriculumService from './services/curriculum'
import { useStore } from './hooks'
import { Section } from './types'

function calculateProgress(section: Section) {
  const numCompletedLessons = section.lessons.filter(l => l.completed ).length
  const result = (numCompletedLessons / section.lessons.length) * 100
  return result.toFixed(1)
}

export default ({sectionId, lessonId, show}) => {
  const sections = useStore<Section[]>(curriculumService)

  return (
    <div className={`menu ${show ? 'show' : ''}`}>
      {sections.map(s => (
        <div key={s.id} className="section">
          <div className="section-info">
            <Link className="menu-item" to="/">{ s.name }</Link>
            <div className="section-progress">
              <div className="progress-bar" style={{ width: `${calculateProgress(s)}%` }}></div>
            </div>
          </div>
          <div className="lessons">
            {s.lessons.map(l => (
              <div className={`menu-item ${s.id == sectionId && l.id == lessonId ? 'active' : null}`} key={l.id}>
                <Link key={l.id} to={`/curriculum/${s.id}/${l.id}`}>{l.name}</Link>
                { l.completed ? <FontAwesomeIcon icon={faCheck} className="completed-icon" /> : null }
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
