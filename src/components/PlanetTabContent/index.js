import React, {useContext, useEffect} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faStar } from '@fortawesome/free-solid-svg-icons';

import { starWarsApi } from '../../services/api';

import { StarWarsContext } from '../../context/StarWarsContext';


export default function PelanetTabContent() {
  const { planetContext } = useContext(StarWarsContext);
  const [planetList, setPlanetList] = planetContext;
  
  useEffect(() => {
    loadPlanets();
  }, []);

  async function loadPlanets(){
    const res = await starWarsApi.get('/planets');
    const data = res.data.results;

    setPlanetList(
      data.map(planet => {
        return {...planet, favorite:false};  
      })
    )    
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
  
  return(
    <Row className='tab-row'>
      {planetList.map(planet => {
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
                  <strong>Rotation period: </strong>
                  <span>{planet.rotation_period}</span>
                </div>
                
                <div className='detail-block'>
                  <strong>Orbital period: </strong>
                  <span>{planet.orbital_period}</span>
                </div>
                
                <div className='detail-block'>
                  <strong>Diameter: </strong>
                  <span>{planet.diameter}</span>
                </div>
                
                <div className='detail-block'>
                  <strong>Climate: </strong>
                  <span>{planet.climate}</span>
                </div>
                
                <div className='detail-block'>
                  <strong>Gravity: </strong>
                  <span>{planet.gravity}</span>
                </div>
                
                <div className='detail-block'>
                  <strong>Terrain: </strong>
                  <span>{planet.terrain}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
    </Row>
  );
}