import React, {useContext, useEffect} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ListGroup from 'react-bootstrap/ListGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { beersApi } from '../../services/api';

import { BrewerContext } from '../../context/BrewerContext';

import './styles.css';

export default function BeersTabContent(){
  const [beersList, setBeersList] = useContext(BrewerContext);
  
  useEffect(()=>{
    loadBeers();
  }, []);

  async function loadBeers(){
    const res = await beersApi.get('/beers');
    const data = res.data;
    
    setBeersList(
      data.map(beer => {
        return {...beer, favorite:false};  
      })
    )
  }

  function favoriteBeer(selected) {
    setBeersList(
      beersList.map(beer => {
        if(beer.id === selected.id) {
          return {...beer, favorite: !beer.favorite};
        }
        return beer;
      })
    );
  }

  return(
    <Row>
      {beersList.map(beer => {
        return(
          <Col key={beer.id} xs={6} sm={6} md={4} lg={3} xl={3}>
            <Card>
              <Card.Img variant='top' src={beer.image_url}/>
              <Card.Header>
                <Card.Title>{beer.name}</Card.Title>
                <Button onClick={()=>{favoriteBeer(beer)}}
                  variant={beer.favorite ? 'success' : 'primary'}>
                  <FontAwesomeIcon icon={faStar} />
                </Button>
              </Card.Header>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>{beer.tagline}</ListGroup.Item>
                <ListGroup.Item>
                  <strong>First Brewed: </strong>
                  {beer.first_brewed}
                </ListGroup.Item>
                <ListGroup.Item>
                  <OverlayTrigger
                      placement='right'
                      overlay={
                        <Tooltip id={`tooltip-${beer.name}`}>
                        {beer.description}
                        </Tooltip>
                      }>
                      <Button variant="secondary">{`${beer.description.substring(0, 20)} ...`}</Button>
                    </OverlayTrigger>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        )
      })}
      </Row>
  )
}