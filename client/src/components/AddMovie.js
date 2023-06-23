import { gql, useQuery } from '@apollo/client';

const GET_DIRECTORS_QUERY = gql`
    {
        directors {
            id
            name
        }
    }
`;

const AddMovie = () => {
    const { loading, error, data } = useQuery(GET_DIRECTORS_QUERY);

    const renderDirectors = () => {
        if (loading) return <option disabled>Loading directors...</option>;
        if (error) return <option disabled>Error loading directors!</option>;

        return data.directors.map(director => (
            <option key={director.id} value={director.id}>
                {director.name}
            </option>
        ));
    };

    return (
        <form id="add-movie">
            <div>
                <label>Movie name:</label><br />
                <input id="movie-name" name="movie-name" type="text" />
            </div>

            <div>
                <label>Genre:</label><br />
                <input id="genre" name="genre" type="text" />
            </div>

            <div>
                <label>Director:</label><br />
                <select id="director" name="director">
                    {renderDirectors()}
                </select>
            </div>

            <button>Add Movie</button>
        </form>
    );
}
  
export default AddMovie;