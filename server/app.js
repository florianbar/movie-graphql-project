const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

const CONNECTION_URL = 'mongodb+srv://florianbar:5toTo8kKr7BFGAU5@lyricalgraphqlcluster.vvnphqt.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(CONNECTION_URL);
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(5000, () => {
    console.log('Server listening on port 5000');
});