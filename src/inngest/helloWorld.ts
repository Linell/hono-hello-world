import { inngest } from "./client"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello-world" },
  async () => {
    return { message: "Hello, world!" }
  }
)
