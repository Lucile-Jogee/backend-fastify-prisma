// function to create the fastify instance

import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyStatic from '@fastify/static';
import path from 'path';

const swaggerOptions = {
  swagger: {
    info: {
      title: "My Title",
      description: "My Description.",
      version: "1.0.0",
    },
    host: "localhost",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "Default", description: "Default" }],
  },
};

const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};


import booksRoute from "./routes/books.route.js";
import route from "./routes/login.books.route.js";
import prismaPlugin from "./plugins/prisma.js";
import cookie from '@fastify/cookie';
import session from '@fastify/session';

const registerApp = async (app, opt) => {
  app.register(fastifySwagger, swaggerOptions);
  app.register(fastifySwaggerUi, swaggerUiOptions);
  app.register(prismaPlugin); 
  app.register(fastifyStatic, { // On est dans le backend. Quand le client demande une route qui n'existe pas, il va ici et renvoie vers le fichier public/cequ'onaécritdans l'url
    root: path.join(process.cwd(), 'public'),
    prefix: '/',
  });
  app.register(booksRoute, { prefix: "/books" });
  app.register(route, { prefix: "/user" });
  app.register(cookie);
  app.register(session, {
    secret: 'un_secret_pour_la_session_qui_fait_plus_de_32_caractères',
    cookie: { secure: false },
  });
};
  

export default registerApp;



