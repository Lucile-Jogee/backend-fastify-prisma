async function route(fastify, options) {
    const createUser = {
        body: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string' },  
            password: { type: 'string' },
          },
        },
      };
  
    fastify.post('/register', { schema: createUser }, async (request, reply) => {
        const { username, password } = request.body;
        if (!username || !password) {
        reply.code(400).send({ error: 'Username and password are required' });
          return;
        }
        const user = await fastify.prisma.user.create({
          data: { username, password },
        });
        reply.code(201).send(book);
      });
}

export default route;