import { Section, Lesson } from '../types'

const curriculum: Array<Section> = [
  {
    id: "preparacion",
    name: "Preparación",
    lessons: [
      { id: "bienvenidos", name: "Bienvenido(a)!" },
      { id: "intro-preparacion", name: "Introducción al desarrollo Web" },
      { id: "como-funciona-internet", name: "¿Cómo funciona Internet?" },
      { id: "www", name: "La World Wide Web (WWW)"},
      { id: "servidores-aplicaciones", name: "Servidores y aplicaciones Web" },
      { id: "roles", name: "Roles en el desarrollo Web" },
      { id: "herramientas", name: "Herramientas principales "},
      { id: "linea-de-comandos", name: "Trabajando con la línea de comandos" },
      { id: "resumen-preparacion", name: "Resumen preparación" }
    ]
  },
  {
    id: "git-github",
    name: "Git y Github",
    lessons: [
      { id: "lo-que-aprenderas-git-github", name: "Bienvenido al módulo de Git y Github" },
      { id: "primeros-pasos", name: "Primeros pasos" },
      { id: "git-status", name: "El comando git status" },
      { id: "ignore", name: "Estado de archivos y .gitignore" },
      { id: "github", name: "Github" },
      { id: "resumen-git", name: "Resumen Git" }
    ]
  },
  {
    id: "html-css",
    name: "HTML y CSS",
    lessons: [
      { id: "lo-que-aprenderas-html-css", name: "Bienvenido al módulo de HTML y CSS" },
      { id: "intro-html-css", name: "Introducción" },
      { id: "html", name: "HyperText Markup Language (HTML)" },
      { id: "reto-mi-primer-archivo-html", name:"Reto: Escribiendo mi primer archivo HTML"},
      { id: "css", name: "Cascading Style Sheets (CSS)" },
      { id: "reto-agregando-estilos", name:"Reto: Agregando estilos"},
      { id: "mas-html", name: "Más elementos de HTML" },
      { id: "reto-creando-elementos", name:"Reto: Creando elementos"},
      { id: "tablas", name: "Tablas" },
      { id: "reto-organizando-informacion-en-tablas", name:"Reto: Organizando la información en tablas"},
      { id: "formularios", name: "Formularios" },
      { id: "reto-capturando-informacion-del-usuario", name:"Reto: capturando información del usuario"},
      { id: "modelo-caja", name: "Modelo de caja" },
      { id: "reto-moviendo-las-cajas", name:"Reto: Moviendo las cajas"},
      { id: "fondos", name: "Fondos" },
      { id: "reto-cambiando-el-fondo", name:"Reto: Combinando el fondo"},
      { id: "posicionamiento", name: "Posicionamiento básico" },
      { id: "reto-posicionando-elementos", name:"Reto: Posicionando elementos"},
      { id: "selectores-css", name: "Selectores CSS" },
      { id: "reto-seleccionando-el-elemento-correcto", name:"Reto: Seleccionando el elemento correcto"},
      { id: "sombras", name: "Sombras" },
      { id: "reto-agregando-sombras", name:"Reto: agregando sombras"},
      { id: "gradientes", name: "Gradientes" },
      { id: "reto-combinando-colores", name:"Reto: Combinando colores"},
      { id: "media-queries",  name: "Media Queries" },
      { id: "reto-ajustando-la-pantalla", name:"Reto: Ajustando la pantalla"},
      { id: "resumen-html-css", name: "Resumen HTML y CSS" },
    ]
  },
  {
    id: "javascript",
    name: "JavaScript",
    lessons: [
      { id: "lo-que-aprenderas-js", name: "Bienvenido al módulo de JavaScript"},
      { id: "primeros-pasos", name: "Primeros pasos" },
      { id: "retos-primeros-pasos", name: "Reto: tu primer programa" },
      { id: "tipos-operadores", name: "Tipos y Operadores" },
      { id: "retos-tipos-y-operadores", name: "Reto: Tipos y operadores" },
      { id: "variables", name: "Variables de JavaScript" },
      { id: "retos-variables", name: "Reto: variables de JavaScript" },
      { id: "condicionales", name: "Condicionales" },
      { id: "retos-condicionales", name: "Reto: Condicionales" },
      { id: "ciclos", name: "Ciclos" },
      { id: "retos-ciclos", name: "Reto: Ciclos" },
      { id: "funciones", name: "Funciones" },
      { id: "retos-funciones", name: "Reto: Funciones" },
      { id: "arreglos", name: "Arreglos" },
      { id: "retos-arreglos", name: "Reto: Arreglos" },
      { id: "cadenas-de-texto", name: "Cadenas de texto" },
      { id: "retos-cadenas-de-texto", name: "Reto: Cadenas de texto" },
      { id: "objetos-literales", name: "Objetos literales" },
      { id: "retos-objetos-literales", name: "Reto: Objetos literales" },
      { id: "resumen-js", name: "Resumen JavaScript" },
      { id: "siguientes-pasos", name: "Siguientes pasos" },
    ]
  }
]

const getCurriculum = (): Promise<Section[]> => {
  return new Promise(resolve => {
    resolve(curriculum)
  })
}

const findLesson = (sectionId: string, lessonId: string): Promise<Lesson | undefined> => {
  const section = curriculum.find(s => s.id == sectionId)
  return new Promise(resolve => {
    if (!section) {
      return resolve()
    }

    const lesson = section!.lessons!.find(l => l.id == lessonId)
    resolve(lesson)
  })
}

export default {
  getCurriculum,
  findLesson
}
