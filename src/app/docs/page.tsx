import swaggerJsdoc from 'swagger-jsdoc'
import SwaggerDoc from '@/components/swagger-doc'

const CONFIG = {
  jsDocs: {
    apis: ['**/api/**/route.js'],
    swaggerDefinition: {
      info: {
        title: 'Some Service',
        version: '0.0.1',
        description: 'This is an API doc for Some Service.',
      },
    },
  },
}

const Docs = () => {
  const spec = swaggerJsdoc(CONFIG.jsDocs)

  return <SwaggerDoc spec={spec} />
}

export default Docs
