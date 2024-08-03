import axios from 'axios';

//setting this up allows the user to not worry about the base url when using the axios method as it includes it in here
const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

export default instance;
