import { useQuery } from '@apollo/client';

import { GET_MOVIE_QUERY } from '../queries/queries';

const MovieDetails = ({ id }) => {
    const { loading, error, data } = useQuery(GET_MOVIE_QUERY, {
        variables: { id }
    });

    console.log("id", data);

    return (
        <>
            <div>Output Movie Details</div>
            <div>
                {loading && <p>Loading movie details...</p>}
                {error && <p>Error loading movie details!</p>}
                {data?.movie && (
                    <>
                        <h2>{data.movie.name}</h2>
                        <p>{data.movie.genre}</p>
                        <p>{data.movie.director.name}</p>
                        <p>All movies by this director:</p>
                        <ul>
                            {data.movie.director.movies.map(movie => (
                                <li key={movie.id}>{movie.name}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
}
  
export default MovieDetails;