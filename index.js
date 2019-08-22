const express = require('express');

const postRoutes = require('./posts/postRoutes');
const commentsRoutes = require('./comments/commentsRoutes');

const server = express();

server.use(express.json());

server.use('/api/posts', postRoutes);
server.use('/api/posts/comments', commentsRoutes);

server.listen(4000, () => {
    console.log(`server listening on port 4000`);
});