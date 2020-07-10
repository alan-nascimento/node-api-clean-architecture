export default {
  mongoUrl: process.env.MONGO_URL || 'monogdb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5000
}
