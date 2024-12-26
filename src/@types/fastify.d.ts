import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user?: {
      id: string
      session_id: string
      first_name: string
      email: string
      gender: string
      created_at: string          
    }
  }
}