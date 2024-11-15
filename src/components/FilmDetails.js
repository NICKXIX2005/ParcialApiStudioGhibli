import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const FilmDetails = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [species, setSpecies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      const response = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
      const data = await response.json();
      setFilm(data);

      const characterPromises = data.people.map(url => fetch(url).then(res => res.json()));
      const speciesPromises = data.species.map(url => fetch(url).then(res => res.json()));
      const locationPromises = data.locations.map(url => fetch(url).then(res => res.json()));
      const vehiclePromises = data.vehicles.map(url => fetch(url).then(res => res.json()));

      Promise.all(characterPromises).then(setCharacters);
      Promise.all(speciesPromises).then(setSpecies);
      Promise.all(locationPromises).then(setLocations);
      Promise.all(vehiclePromises).then(setVehicles);
    };

    fetchFilmDetails();
  }, [id]);

  if (!film) return <div>Cargando...</div>;

  return (
    <div>
      <h2>{film.title}</h2>
      <p>Año: {film.release_date}</p>
      <p>Descripción: {film.description}</p>

      <h3>Personajes</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => (
            <tr key={character.id}>
              <td>{character.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Especies</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {species.map(specie => (
            <tr key={specie.id}>
              <td>{specie.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Ubicaciones</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(location => (
            <tr key={location.id}>
              <td>{location.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Vehículos</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicle => (
            <tr key={vehicle.id}>
              <td>{vehicle.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Enlace para volver a la lista de películas */}
      <Link to="/" className="btn btn-secondary">Volver a la lista de películas</Link>
    </div>
  );
};

export default FilmDetails;