import { gql, useQuery } from '@apollo/client';

const GET_MOVIES_QUERY = gql`
    {
        movies {
            id
            name
            genre
        }
    }
`;

const MovieList = () => {
    const { loading, error, data } = useQuery(GET_MOVIES_QUERY);

    if (loading) return <p>Loading...</p>;

    return (
        <ul>
            {data.movies.map(movie => (
                <li key={movie.id}>
                    {movie.name}{" "}
                    <small>({movie.genre})</small>
                </li>
            ))}
        </ul>
    );
}
  
export default MovieList;