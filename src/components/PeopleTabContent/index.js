import React, {useContext, useEffect} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { starWarsApi } from '../../services/api';

import { StarWarsContext } from '../../context/StarWarsContext';

export default function PeopleTabContent() {
  const {peopleContext} = useContext(StarWarsContext);
  const [peopleList, setPeopleList] = peopleContext;
  
  useEffect(() => {
    loadPeople();
  }, []);

  async function loadPeople(){
    const res = await starWarsApi.get('/people');
    const data = res.data.results;

    setPeopleList(
      data.map(people => {
        return {...people, favorite:false};  
      })
    )    
  }

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
  
  return(
    <Row className='tab-row'>
      {peopleList.map(people => {
        return(
          <Col key={people.name} xs={6} sm={6} md={4} lg={3} xl={3}>
            <Card border='secondary'>
              <Card.Header>
                {people.name}
                <Button onClick={()=>{favoritePeople(people)}} 
                  variant={people.favorite ? 'success' : 'primary'}>
                  <FontAwesomeIcon icon={faStar} />
                </Button>
              </Card.Header>
              <Card.Body>
                <div className='detail-block'>
                  <strong>Gender: </strong>
                  <span>{people.gender}</span>
                </div>
                <div className='detail-block'>
                  <strong>Birth year: </strong>
                  <span>{people.birth_year}</span>
                </div>
                <div className='detail-block'>
                  <strong>Height: </strong>
                  <span>{people.height}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
    </Row>
  );
}