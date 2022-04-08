import {promises as fsPromises} from 'fs';
import os from 'os';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


fsPromises.stat(path.join(__dirname, 'weather.js'))
  .then((stat) => {
    //console.log(stat)
  })
  .catch((err) => console.log(err))

const filePath = path.join(os.homedir(), 'weather-data.json');
//console.log(filePath);

const isExists = async (path) => {
  try {
    await fsPromises.stat(path);
    return true;
  } catch (err) {
    return false;
  }
}

//console.log(await isExists(filePath));


const data = await fsPromises.readFile(filePath);
//console.log(JSON.parse(data));

const obj = {
  token: 123,
  city: 'moscow'
};

const jsonObj = JSON.stringify(obj);

const newObj = JSON.parse(jsonObj);

delete newObj.city;

newObj.city = 'sochi';

console.log(newObj);