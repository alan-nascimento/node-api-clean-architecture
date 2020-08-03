import { adaptMiddleware } from '@/main/adapters/express/express-middleware-adapter'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
