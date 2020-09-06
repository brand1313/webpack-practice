import 'normalize.css';
import styles from './index.css';
import $ from 'jquery';
import pengsooImg from './images/pengsoo.jpeg'; 
import carrotImg from './images/carrot.svg';

const component = () => {
    const element = document.createElement('div');
    element.innerHTML = "webpack funny!!!"; 
    const elementImg = document.createElement('img');
    // elementImg.src = pengsooImg;
    elementImg.src = carrotImg;
    element.appendChild(elementImg);
    element.classList = styles.helloWebpack;
    return element;
}


document.body.appendChild(component());
console.log($(`.${styles.helloWebpack}`).length);

console.log(`IS_PRODUCTION_MODE : `+IS_PRODUCTION);