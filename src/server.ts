import fastify from 'fastify'
import { env } from './env'
import { usersRoutes } from './routes/users'
import { mealsRoutes } from './routes/meals'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(usersRoutes, {
  prefix: 'users',
})

app.register(mealsRoutes, {
  prefix: 'meals',
})

app
  .listen({ port: env.PORT, host: '0.0.0.0' })
  .then((address) => {
    console.log(`Server listenning on ${address}`)
  })
  .catch((err) => {
    console.log('Error starting server:', err)
    process.exit(1)
  })
