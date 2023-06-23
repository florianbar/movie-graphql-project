import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_MOVIES_QUERY } from '../queries/queries';
import MovieDetails from './MovieDetails';

const MovieList = () => {
    const [selected, setSelected] = useState(null);
    const { loading, data } = useQuery(GET_MOVIES_QUERY);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <ul>
                {data.movies.map(movie => (
                    <li key={movie.id} onClick={() => setSelected(movie.id)}>
                        {movie.name}{" "}
                        <small>({movie.genre})</small>
                    </li>
                ))}
            </ul>
            {selected && (
                <MovieDetails id={selected} />
            )}
        </>
    );
}
  
export default MovieList;