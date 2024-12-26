//eslint-disable-next-line
import { knex } from 'knex'

declare module 'knex/types/tables' {
  // Definindo interface para de tipagem de dados na tabela "users"
  export interface Tables {
    users: {
      id: string
      first_name: string
      gender: string
      email: string
      created_at: string
      session_id: string
    }
// Definindo interface para de tipagem de dados na tabela "meals"
    meals: {
      id: string
      user_id: string
      name: string
      description: string
      is_on_diet: boolean
      date: number
      created_at: string
    }
  }
}
