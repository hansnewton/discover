import axios from 'axios';

export const starWarsApi = axios.create({baseURL: 'https://swapi.dev/api'});

export const beersApi = axios.create({baseURL: 'https://api.punkapi.com/v2'});