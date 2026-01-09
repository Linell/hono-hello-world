import { Hono } from 'hono'
import { renderer } from './renderer'

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
  async (c) => {
    if (!cachedHandler) {
      // Dynamic imports - deferred until request time when crypto is available
      const { serve } = await import('inngest/hono');
      const { functions, inngest } = await import('./inngest');
      cachedHandler = serve({ client: inngest, functions });
    }
    return cachedHandler(c);
  }
)

export default app
