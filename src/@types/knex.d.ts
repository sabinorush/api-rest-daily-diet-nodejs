//eslint-disable-next-line
import { knex } from 'knex'

declare module 'knex/types/tables' {
  // Definindo interface para de tipagem de dados na tabela "users"
  export interface Tables {
    users: {
      id: string
      first_name: string
      gender: string
      created_at: string
      session_id?: string
    }
  }
}
