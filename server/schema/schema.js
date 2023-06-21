const graphql = require('graphql');
const Movie = require('../models/movie');
const Director = require('../models/director');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const movies = [
    { id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1' },
    { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2' },
    { id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '3' },
    { id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4' },
    { id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '1' },
    { id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '1' },
    { id: '7', name: 'Inglourious Basterds', genre: 'Crime', directorId: '1' }
];

const directors = [
    { id: '1', name: 'Quentin Tarantino', age: 55, movies: ['1', '5', '6', '7'] },
    { id: '2', name: 'Michael Radford', age: 72, movies: ['2'] },
    { id: '3', name: 'James McTeigue', age: 51, movies: ['3'] },
    { id: '4', name: 'Guy Ritchie', age: 50, movies: ['4'] }
];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: { 
            type: DirectorType,
            resolve(parent, args) {
                return directors.find(director => director.id === parent.directorId);
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies.filter(movie => movie.directorId === parent.id);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                return movies.find(movie => movie.id === args.id);
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                return directors.find(director => director.id === args.id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies;
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return directors;
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});