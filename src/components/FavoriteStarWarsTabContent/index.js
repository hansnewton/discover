import React, {useContext} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { StarWarsContext } from '../../context/StarWarsContext';

export default function FavoriteStarWarsTabContent() {

  const {peopleContext,filmContext,planetContext} = useContext(StarWarsContext);
  
  const [filmList, setFilmList] = filmContext;
  const [planetList, setPlanetList] = planetContext;
  const [peopleList, setPeopleList] = peopleContext;

  function favoritePeople(selected) {
    setPeopleList(
      peopleList.map(people => {
        if(people.name === selected.name) {
          return {...people, favorite: !people.favorite};
        }
        return people;
      })
    );
  }

  function favoriteFilm(selected) {
    setFilmList(
      filmList.map(film => {
        if(film.title === selected.title) {
          return {...film, favorite: !film.favorite};
        }
        return film;
      })
    );
  }

  function favoritePlanet(selected) {
    setPlanetList(
      planetList.map(planet => {
        if(planet.name === selected.name) {
          return {...planet, favorite: !planet.favorite};
        }
        return planet;
      })
    );
  }

  function hasFavorites(){
    return peopleList.filter(item=>item.favorite).length + 
           filmList.filter(item=>item.favorite).length + 
           planetList.filter(item=>item.favorite).length > 0;
  }

  function getFavoritesPeople(){
    return peopleList.filter(person=>person.favorite)
    .map(person => {
      return(
        <Col key={person.name} xs={6} sm={4} md={4} lg={3} xl={3}>
          <Card border='secondary'>
            <Card.Header>
              {person.name}
              <Button onClick={()=>{favoritePeople(person)}} 
                variant={person.favorite ? 'success' : 'primary'}>
                <FontAwesomeIcon icon={faStar} />
              </Button>
            </Card.Header>
            <Card.Body>
              <div className='detail-block'>
                <strong>Gender</strong>
                <span>{person.gender}</span>
              </div>
              <div className='detail-block'>
                <strong>Birth year</strong>
                <span>{person.birth_year}</span>
              </div>
              <div className='detail-block'>
                <strong>Height</strong>
                <span>{person.height}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      )
    })
  }

  function getFavoritesFilms(){
    return filmList.filter(film=>film.favorite)
    .map(film => {
      return(
        <Col key={film.title} xs={6} sm={6} md={4} lg={3} xl={3}>
          <Card border='info'>
            <Card.Header>
              {film.title}
              <Button onClick={()=>{favoriteFilm(film)}} 
                variant={film.favorite ? 'success' : 'primary'}>
                <FontAwesomeIcon icon={faStar} />
              </Button>
            </Card.Header>
            <Card.Body>
              <div className='detail-block'>
                <strong>Eposide</strong>
                <span>{film.episode_id}</span>
              </div>
              <div className='detail-block'>
                <strong>Director</strong>
                <span>{film.director}</span>
              </div>
              <div className='detail-block'>
                <strong>Producer(s)</strong>
                <span>{film.producer}</span>
              </div>
              <div className='detail-block'>
                <strong>Opening Crawl</strong>
                <span>
                  <OverlayTrigger
                    placement='right'
                    overlay={
                      <Tooltip id={`tooltip-${film.name}`}>
                      {film.opening_crawl}
                      </Tooltip>
                    }>
                    <Button variant="secondary">{`${film.opening_crawl.substring(0, 20)} ...`}</Button>
                  </OverlayTrigger>
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      )
    })
  }

  function getFavoritesPlanets(){
    return planetList.filter(planet=>planet.favorite)
    .map(planet => {
      return(
        <Col key={planet.name} xs={6} sm={6} md={4} lg={3} xl={3}>
          <Card border='dark'>
            <Card.Header>
              {planet.name}
              <Button onClick={()=>{favoritePlanet(planet)}} 
                variant={planet.favorite ? 'success' : 'primary'}>
                <FontAwesomeIcon icon={faStar} />
              </Button>
            </Card.Header>
            <Card.Body>
              
              <div className='detail-block'>
                <strong>Rotation period</strong>
                <span>{planet.rotation_period}</span>
              </div>
              <div className='detail-block'>
                <strong>Orbital period</strong>
                <span>{planet.orbital_period}</span>
              </div>
              <div className='detail-block'>
                <strong>Diameter</strong>
                <span>{planet.diameter}</span>
              </div>
              <div className='detail-block'>
                <strong>Climate</strong>
                <span>{planet.climate}</span>
              </div>
              <div className='detail-block'>
                <strong>Gravity</strong>
                <span>{planet.gravity}</span>
              </div>
              <div className='detail-block'>
                <strong>Terrain</strong>
                <span>{planet.terrain}</span>
              </div>
              
            </Card.Body>
          </Card>
        </Col>
      )
    })
  }

  return(
    <Row className='tab-row'>
      { !hasFavorites() && <Col><strong>No favorite added</strong></Col> }
      
      {getFavoritesPeople()}
      {getFavoritesFilms()}
      {getFavoritesPlanets()}
    </Row>
  );
}