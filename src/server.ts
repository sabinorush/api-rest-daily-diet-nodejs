import { env } from './env'
import { app } from './app'

app
  .listen({ port: env.PORT, host: '0.0.0.0' })
  .then((address) => {
    console.log(`Server listenning on ${address}`)
  })
  .catch((err) => {
    console.log('Error starting server:', err)
    process.exit(1)
  })
