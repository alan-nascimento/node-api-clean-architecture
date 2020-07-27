export default {
  port: process.env.PORT || 5000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/node-api-clean-architecture',
  jwtSecret: process.env.JWT_SECRET || '4fe889f73fb6b04f5cd5f853c5cfd5bd'
}
