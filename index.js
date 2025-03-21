// const { generateRandomNumber, celciusToFahrenheit } = require("./utils.js");
// console.log(`Random number: ${generateRandomNumber()}`);
// console.log(`Celcius to fahrenhiet: ${celciusToFahrenheit(0)}`);
import getPosts, { getPostLength } from "./postController.js";
console.log(getPosts());
console.log(`Posts lenght: ${getPostLength()}`);
