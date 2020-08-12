import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

import starwarsIcon from  '../../assets/icons/starwars.png';
import punkApiIcon from  '../../assets/icons/punkapi.png';

import './styles.css';

export default function Home() {
  const resourcesImplemented = [
    {name: 'StarWars', description:'People, Films, Planets, ...', img:starwarsIcon, path:'/star-wars'},
    {name: 'Brew', description:'Become a beer expert ..', img:punkApiIcon, path:'/brewer'},
  ]

  return(
    <div className='container'>
    <header>
      <h1>Discover</h1>
      <hr/>
    </header>
    <main>
      <h1>Hello, </h1>
      <p>
        This is a simple app for discovering users tastes in subjects. Start by click in a subject bellow.
      </p>
      <hr/>
      <Carousel>
        {resourcesImplemented.map(resource => {
          return(
            <Carousel.Item key={resource.name}>
            <h2>{resource.name}</h2>
            <p>{resource.description}</p>
            <Carousel.Caption>
              <Link to={resource.path}>
                Discover {resource.name} world now !
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          );
        })}
      </Carousel>
    </main>
    <footer>
      <hr/>
      2020 - All rights reserved
    </footer>
  </div>
  );
}