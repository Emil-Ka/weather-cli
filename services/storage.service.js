import os from 'os';
import {promises as fsPromises} from 'fs';
import path from 'path';

const filePath = path.join(os.homedir(), 'weather-data.json')

const isExists = async (path) => {
  try {
    await fsPromises.stat(path);
    return true;
  } catch (err) {
    return false;
  }
}

export const setKeyValue = async (key, value) => {
  let data  = {};

  if (await isExists(filePath)) {
    await fsPromises.readFile(filePath)
      .then((res) => {
        data = JSON.parse(res);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  delete data[key];
  data[key] = value;

  await fsPromises.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key) => {
  let result = undefined;

  if (isExists(filePath)) {
    await fsPromises.readFile(filePath)
      .then((res) => {
        result = JSON.parse(res)[key];
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  return result;
}