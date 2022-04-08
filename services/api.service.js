import axios from 'axios';

import {getKeyValue} from './storage.service.js';
import {CONSTANTS_DICTIONARY} from '../weather.js';

export const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '⛅';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
    default:
      return '☁️';
  }
};

export const getWeather = async (city) => {
  const token  = await getKeyValue(CONSTANTS_DICTIONARY.token);

  if (!token) {
    throw new Error('API ключ не был задан, команда, чтобы задать его: -t [API_TOKEN]');
  }

  const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      units: 'metric',
      lang: 'ru'
    }
  });

  return data;
};