import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PeopleTabContent from '../../components/PeopleTabContent';
import FilmTabContent from '../../components/FilmTabContent';
import PlanetTabContent from '../../components/PlanetTabContent';
import FavoriteStarWarsTabContent from '../../components/FavoriteStarWarsTabContent';

import { StarWarsContext } from '../../context/StarWarsContext';

import './styles.css';

export default function StarWars(){
  const [peopleList, setPeopleList] = useState([]);
  const [filmList, setFilmList] = useState([]);
  const [planetList, setPlanetList] = useState([]);

  return (
    <StarWarsContext.Provider value={{
        peopleContext: [peopleList, setPeopleList],
        filmContext: [filmList, setFilmList],
        planetContext: [planetList, setPlanetList]
      }}>
      <Container>
        <header>
          <h1>
            <Link to='/'>
              Discover
            </Link>
          </h1>
          <h3>Star Wars</h3>
        </header>
        <main>
          <Tabs defaultActiveKey="people">
            <Tab eventKey="people" title="People">
              <PeopleTabContent/>  
            </Tab>
            <Tab eventKey="films" title="Films">
              <FilmTabContent/>
            </Tab>
            <Tab eventKey="planets" title="Planets">
              <PlanetTabContent/>
            </Tab>
            <Tab eventKey="favorites" title="Favorites">
              <FavoriteStarWarsTabContent/>
            </Tab>
          </Tabs>
        </main>
        <footer>
          <hr/>
          2020 - All rights reserved
        </footer>
      </Container>
    </StarWarsContext.Provider>
  );
}