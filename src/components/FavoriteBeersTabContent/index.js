import React, {useContext} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ListGroup from 'react-bootstrap/ListGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { BrewerContext } from '../../context/BrewerContext';

export default function FavoriteBeersTabContent() {
  
  const [beersList, setBeersList] = useContext(BrewerContext);

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

  function hasFavorites(){
    return beersList.filter(item=>item.favorite).length > 0;
  }

  function getFavoritesBeers(){
    return beersList.filter(beer=>beer.favorite)
    .map(beer => {
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
    })
  }

  
  return(
    <Row className='tab-row'>
      { !hasFavorites() && <Col><strong>No favorite added</strong></Col> }
      
      {getFavoritesBeers()}
    </Row>
  );
}