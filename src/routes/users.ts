import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function usersRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const users = await knex('users').where('session_id', sessionId).select()

      return {
        users,
      }
    },
  )

  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      first_name: z.string(),
      gender: z.enum(['male', 'female']),
      email: z.string().email(),
    })

    //Verificar se existe cookie da sessao atual, caso nao exista cria um novo cookie
    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    //Validar se o email que o usuario deseja cadastrar ja existe
    const { first_name, gender, email } = createUserBodySchema.parse(
      request.body,
    )

    const userByEmail = await knex('users').where({ email }).first()

    if (userByEmail) {
      return reply.status(401).send({ message: 'User already exists!' })
    }

    //Criar usuario
    await knex('users').insert({
      id: randomUUID(),
      first_name,
      email,
      gender,
      session_id: sessionId,
    })

    return reply.status(201).send({ Sucess: 'User created sucessfully!' })
  })
}
