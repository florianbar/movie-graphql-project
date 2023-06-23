import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { 
    GET_DIRECTORS_QUERY, 
    GET_MOVIES_QUERY, 
    ADD_MOVIE_MUTATION 
} from '../queries/queries';

const AddMovie = () => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [directorId, setDirectorId] = useState('');
    const { loading, error, data } = useQuery(GET_DIRECTORS_QUERY);
    const [addMovie] = useMutation(ADD_MOVIE_MUTATION);

    const renderDirectors = () => {
        if (loading) return <option disabled>Loading directors...</option>;
        if (error) return <option disabled>Error loading directors!</option>;

        return data.directors.map(director => (
            <option key={director.id} value={director.id}>
                {director.name}
            </option>
        ));
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(name, genre, directorId);
        addMovie({
            variables: {
                name,
                genre,
                directorId
            },
            refetchQueries: [{ query: GET_MOVIES_QUERY }]
        });
    };

    return (
        <form id="add-movie" onSubmit={handleSubmit}>
            <div>
                <label>Movie name:</label><br />
                <input 
                    id="movie-name" 
                    name="movie-name" 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div>
                <label>Genre:</label><br />
                <input 
                    id="genre" 
                    name="genre" 
                    type="text" 
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                />
            </div>

            <div>
                <label>Director:</label><br />
                <select 
                    id="director" 
                    name="director"
                    value={directorId}
                    onChange={e => setDirectorId(e.target.value)}
                >
                    {renderDirectors()}
                </select>
            </div>

            <button type="submit">Add Movie</button>
        </form>
    );
}
  
export default AddMovie;