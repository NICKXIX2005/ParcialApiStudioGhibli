import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';

const FilmList = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      const response = await fetch('https://ghibliapi.vercel.app/films');
      const data = await response.json();
      setFilms(data);
    };

    fetchFilms();
  }, []);

  return (
    <div>
      <h2>Lista de Películas</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {films.map(film => (
          <Col key={film.id}>
            <Card>
              <Card.Body>
                <Card.Title>{film.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Año: {film.release_date}
                </Card.Subtitle>
                <Card.Text>{film.description.substring(0, 100)}...</Card.Text>
                <Link to={`/film/${film.id}`} className="btn btn-primary">Ver Detalles</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FilmList;