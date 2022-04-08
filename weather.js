import {getArgs} from './helpers/args.js';
import {printHelp, printSuccess, printError, printWeather} from './services/log.service.js';
import {setKeyValue, getKeyValue} from './services/storage.service.js';
import {getWeather, getIcon} from './services/api.service.js';

export const CONSTANTS_DICTIONARY = {
  token: 'token',
  city: 'city'
}

const saveToken = async (token) => {
  if (!token.length) {
    printError('Токен не передан');
    return;
  }

  try {
    await setKeyValue(CONSTANTS_DICTIONARY.token, token);
    printSuccess('Токен успешно сохранён');
  } catch(err) {
    printError(err.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError('Город не передан');
    return;
  }

  try {
    await setKeyValue(CONSTANTS_DICTIONARY.city, city);
    printSuccess('Город успешно сохранён');
  } catch(err) {
    printError(err.message);
  }
};

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(CONSTANTS_DICTIONARY.city);
    const data = await getWeather(city);
    printWeather(data, getIcon(data.weather[0].icon));
  } catch(err) {
    if (err?.response?.status === 404) {
      printError('Вы неправильно ввели город');
    } else if (err?.response?.status === 401) {
      printError('Вы неправильно ввели токен');
    } else {
      printError(err.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }

  return getForecast();
};

initCLI();