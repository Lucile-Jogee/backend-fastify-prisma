async function userRoute(fastify, options) {
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
        const existant = await fastify.prisma.user.findUnique( {where: { username: username},})
        if (!existant){
          const user = await fastify.prisma.user.create({
            data: { username, password },
          });
          reply.code(201);
            return;
        }
        reply.code(400).send({ error: 'Username already existing' });
          return;
      });
    
    const logUser = {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },  
          password: { type: 'string' },
        },
      },
    };
  
    fastify.post('/register', { schema: logUser }, async (request, reply) => {
      const { username, password } = request.body;
      if (!username || !password) {
        reply.code(400).send({ error: 'Username and password are required' });
          return;
        }
      const user = await fastify.prisma.user.findUnique( {where: { username: username, password : password },})
      if (!user){
        reply.code(400).send({ error: 'Incorrect username or password' });
          return;
        }
      reply.code(201).send(book);
      });
    
    
}

export default userRoute;