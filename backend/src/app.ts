import express from 'express'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import cookieSession from 'cookie-session'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import { config } from './config'
import { authRateLimiter, apiRateLimiter } from './utils/rateLimiter'
import { errorHandler } from './middleware/errorHandler'
import { router as authRoutes } from './routes/authRoutes'
import { router as userRoutes } from './routes/userRoutes'
import { router as hubRoutes } from './routes/hubRoutes'
import { router as channelRoutes } from './routes/channelRoutes'
import { router as dmRoutes } from './routes/dmRoutes'
import { router as adminRoutes } from './routes/adminRoutes'
import { initSockets } from './sockets'

async function start() {
  await mongoose.connect(config.mongoUri)
  const app = express()
  const httpServer = http.createServer(app)
  const io = new Server(httpServer, {
    cors: { origin: config.clientUrl, methods: ['GET', 'POST'] }
  })
  initSockets(io)
  app.use(helmet())
  app.use(morgan('combined'))
  app.use(cors({ origin: config.clientUrl, credentials: true }))
  app.use(cookieSession({ name: 'session', secret: config.sessionSecret, httpOnly: true, secure: config.nodeEnv === 'production', maxAge: 24 * 60 * 60 * 1000 }))
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use('/auth', authRateLimiter, authRoutes)
  app.use('/api/users', apiRateLimiter, userRoutes)
  app.use('/api/hubs', apiRateLimiter, hubRoutes)
  app.use('/api/channels', apiRateLimiter, channelRoutes)
  app.use('/api/dm', apiRateLimiter, dmRoutes)
  app.use('/api/admin', apiRateLimiter, adminRoutes)
  app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
  app.use((req, res) => res.status(404).json({ error: 'Not found' }))
  app.use(errorHandler)
  const port = config.port
  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})

// TODO: Extract server creation for testing