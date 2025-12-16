import consola from "consola"

Bun.serve({
  fetch: (req) => {
    const path = new URL(req.url).pathname
    const file = path === "/" ? "output/comparison.html" : path.slice(1)
    return new Response(Bun.file(`${import.meta.dir}/../${file}`))
  },
})

consola.info("🚀 http://localhost:3000")
