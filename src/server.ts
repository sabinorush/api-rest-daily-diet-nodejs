import fastify from 'fastify'
import { knex } from './database'
import { randomUUID } from 'node:crypto'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  const user = await knex('users')
    .insert({
      id: randomUUID(),
      first_name: 'Gustavo',
      gender: 'male',
    })
    .returning('*')
  return user
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
