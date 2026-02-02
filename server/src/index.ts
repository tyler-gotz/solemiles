import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import shoesRoutes from './routes/shoes'

const app = new Hono()

app.use(logger())

app.use('/api/*', cors())

app
  .get('/api', (c) => {
    return c.text('Hello From: ' + process.env.APP_NAME)
  })
  .route('/api/shoes', shoesRoutes)


export default app
