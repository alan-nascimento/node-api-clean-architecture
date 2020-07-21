export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || '4fe889f73fb6b04f5cd5f853c5cfd5bd'
}
