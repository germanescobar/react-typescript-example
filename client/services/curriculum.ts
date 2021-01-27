import Store from '../store'
import axios from '../axios'
import { Section } from '../types'

const CURRICULUM_URI = '/curriculum'

class CurriculumService extends Store<Array<Section>> {
  async load() {
    const response = await axios.get(CURRICULUM_URI)
    this.setState(response.data)
  }

  async completeLesson(sectionId: string, lessonId: string) {
    axios.post(`/curriculum/${sectionId}/${lessonId}/complete`)

    this.setState(this.state.map(s => {
      if (s.id == sectionId) {
        s.lessons = s.lessons.map(l => {
          return l.id == lessonId ? { ...l, completed: true } : l
        })
      }

      return s
    }))
  }

  async fetchLesson(sectionId: string, lessonId: string) {
    const response = await axios.get(`/curriculum/${sectionId}/${lessonId}`)
    return response.data
  }
}

export default new CurriculumService([])
