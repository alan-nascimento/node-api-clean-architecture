import paths from './paths'
import schemas from './schemas'
import components from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: '4Dev - Surveys for Programmers',
    description: 'Surveys API developed applying Design Patterns, TDD, SOLID and Clean Architecture',
    version: '1.0.0',
    contact: {
      name: 'Alan Nascimento',
      email: 'alan.silva.n@hotmail.com',
      url: 'https://www.linkedin.com/in/alan-nascimento95'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'Main server'
  }],
  tags: [{
    name: 'Login',
    description: 'Login APIs'
  }, {
    name: 'Survey',
    description: 'Survey APIs'
  }],
  paths,
  schemas,
  components
}
