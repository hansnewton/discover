import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import BeersTabContent from '../../components/BeersTabContent';
import FavoriteBeersTabContent from '../../components/FavoriteBeersTabContent';

import { BrewerContext } from '../../context/BrewerContext';

import './styles.css';

export default function Brewer() {
  const [beersList, setBeersList] = useState([]);
  return(
    <BrewerContext.Provider value={[beersList, setBeersList]}>
      <div id='brewer'>
        <Container>
          <header>
            <h1>
              <Link to='/'>
                Discover
              </Link>
            </h1>
            <h3>Brewer</h3>
          </header>
          <main>
            <Tabs defaultActiveKey="beers">
              <Tab eventKey="beers" title="Beers">
                <BeersTabContent/>
              </Tab>
              <Tab eventKey="favorites" title="Favorites">
                <FavoriteBeersTabContent/>
              </Tab>
            </Tabs>
          </main>
          <footer>
            <hr/>
            2020 - All rights reserved
          </footer>
        </Container>
      </div>
    </BrewerContext.Provider>
  );
}