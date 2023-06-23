import { gql } from '@apollo/client';

export const GET_MOVIES_QUERY = gql`
    {
        movies {
            id
            name
            genre
        }
    }
`;

export const GET_DIRECTORS_QUERY = gql`
    {
        directors {
            id
            name
        }
    }
`;

export const GET_MOVIE_QUERY = gql`
    query($id: ID) {
        movie(id: $id) {
            id
            name
            genre
            director {
                id
                name
                age
                movies {
                    id
                    name
                }
            }
        }
    }
`;

export const ADD_MOVIE_MUTATION = gql`
    mutation($name: String!, $genre: String!, $directorId: ID!) {
        addMovie(name: $name, genre: $genre, directorId: $directorId) {
            id
            name
        }
    }
`;