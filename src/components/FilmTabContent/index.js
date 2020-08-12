import React, {useContext, useEffect} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faStar } from '@fortawesome/free-solid-svg-icons';

import { starWarsApi } from '../../services/api';

import { StarWarsContext } from '../../context/StarWarsContext';

export default function FilmTabContent() {
  const { filmContext } = useContext(StarWarsContext);
  const [filmList, setFilmList] = filmContext;
  
  useEffect(() => {
    loadFilms();
  }, []);

  async function loadFilms(){
    const res = await starWarsApi.get('/films');
    const data = res.data.results;

    setFilmList(
      data.map(film => {
        return {...film, favorite:false};  
      })
    )    
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
  
  return(
    <Row className='tab-row'>
      {filmList.map(film => {
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
                  <strong>Eposide: </strong>
                  <span>{film.episode_id}</span>
                </div>
                <div className='detail-block'>
                  <strong>Director: </strong>
                  <span>{film.director}</span>
                </div>
                <div className='detail-block'>
                  <strong>Producer(s): </strong>
                  <span>{film.producer}</span>
                </div>
                <div className='detail-block'>
                  <strong>Opening Crawl: </strong>
                  <span>
                    
                    <OverlayTrigger
                      placement='right'
                      overlay={
                        <Tooltip id={`tooltip-${film.title}`}>
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
      })}
    </Row>
  );
}