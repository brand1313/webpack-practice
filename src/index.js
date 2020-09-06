import 'normalize.css'; // 브라우저 표준화 먼저하고 
import styles from './index.module.scss';   // 그 다음 index.css
import $ from 'jquery'; //node_modules안에 들어있는 vendor
import pengsooImg from './images/pengsoo.jpeg'; 
import carrotImg from './images/carrot.svg';
import '@babel/polyfill';

const component = () => {
    const element = document.createElement('div');
    element.innerHTML = 'Hello Webpack5!';

    console.log(styles);

    const elementImg = document.createElement('img');
    // elementImg.src = pengsooImg;
    elementImg.src = carrotImg;
    elementImg.classList = styles.svgImg;

    element.appendChild(elementImg);
    element.classList = styles.helloWebpack;
    
    return element;
}

document.body.appendChild(component());
console.log($(`.${styles.helloWebpack}`).length);
console.log(`IS_PRODUCTION : ${IS_PRODUCTION}`)