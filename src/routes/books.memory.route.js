
const books = [];

async function booksMemoryRoute(fastify, options) {

  fastify.get('/', async (request, reply) => {
    return books;
  });

  const getBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  };

  fastify.get('/:id', { schema: getBookSchema }, async (request, reply) => {
    const {id} = request.params;
    let selected_book = {};
    let drapeau = false;
    for (let book of books){
      if (book.id == id){
        selected_book = book;
        drapeau = true}
    }
    if (!drapeau){
      reply.code(404).send({error : "Book not found"})
    }
    reply.code(200).send(selected_book) ;
  });

  const createBookSchema = {
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
  };

  fastify.post('/', { schema: createBookSchema }, async (request, reply) => {
    const {title, author} = request.body;
    if (title.length == 0 | author.length ==0){
      reply.code(400);
      return { error: "Name is required" }
    }
    const book = {id : books.length , title : title, author : author};
    books.push(book);
    reply.code(201).send(book);
  });

  const updateBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
  };

  fastify.put('/:id', { schema: updateBookSchema }, async (request, reply) => {
    const {id} = request.params;
    const {title, author} = request.body;
    let updated_book = {};
    let drapeau = false;
    for (let book of books){
      if (book.id == id){
        updated_book = book;
        drapeau = true}
    }
    if (!drapeau){
      reply.code(404).send({error : "Book not found"})
    }
    if (title.length != 0){
      updated_book.title = title
    }
    if (author.length != 0){
      updated_book.author = author
    }
    reply.code(200).send(updated_book)
  });

  const deleteBookSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  };

  fastify.delete('/:id', { schema: deleteBookSchema }, async (request, reply) => {
    const {id} = request.params;
    for (let book of books){
      if (book.id == id){
        books.splice(ParseInt(id), 1);
        reply.code(204)}
    }
    reply.code(404).send({error : "Book not found"});
  });
}

export default booksMemoryRoute;