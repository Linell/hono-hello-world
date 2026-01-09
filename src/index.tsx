import { Hono } from 'hono'
import { renderer } from './renderer'

import { serve } from 'inngest/hono'
import { functions, inngest } from './inngest'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello from Inngest!</h1>)
})

app.on(
  ["GET", "POST", "PUT"],
  "/api/inngest",
  serve({ client: inngest, functions })
)

export default app
