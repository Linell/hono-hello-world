import { Hono } from 'hono'
import { renderer } from './renderer'
import { inngest, functions } from './inngest'
import { serve } from 'inngest/hono'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello from Inngest!</h1>)
})

// Cache the handler to avoid re-creating on every request
let cachedHandler: Awaited<ReturnType<typeof import('inngest/hono')['serve']>> | null = null;

app.on(
  ["GET", "POST", "PUT"],
  "/api/inngest",
  serve({ client: inngest, functions })
)

export default app
