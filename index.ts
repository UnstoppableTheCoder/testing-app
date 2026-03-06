import os from "os";

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": new Response("This is the homepage"),
    "/health-check": new Response("OK"),
    "/heart-check": new Response("Broken"),
    "/hostname": new Response(`${os.hostname}`),
    "/message": {
      GET: () => Response.json({ message: "hello there" }),
    },
    "/compute": {
      GET: () => {
        for (let i = 0; i < 10000000000; i++) {}
        return Response.json({ message: "Computation is done" });
      },
    },
    "/*": Response.json({ message: "Not found" }, { status: 200 }),
  },
});

console.log(`Listening on ${server.url}`);
