import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      first_name: z.string(),
      gender: z.enum(['male', 'female']),
    })

    const { first_name, gender } = createUserBodySchema.parse(request.body)

    await knex('users').insert({
      id: randomUUID(),
      first_name,
      gender,
    })

    return reply.status(201).send({ Sucess: 'User created sucessfully!' })
  })
}
