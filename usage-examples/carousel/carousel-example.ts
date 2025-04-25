import { createCarousel } from '../../src/'
import './style.css';

import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';

const parent = document.querySelector('#restaurant-photos');


const carousel = createCarousel({
images: [
    { url: img1, title: 'Image 1', alt: 'Image 1' },
    { url: img2, title: 'Image 2', alt: 'Image 2' },
    { url: img3, title: 'Image 3', alt: 'Image 3' },
    { url: img4, title: 'Image 4', alt: 'Image 4' },
    { url: img5, title: 'Image 5', alt: 'Image 5' }
]
});


parent?.appendChild(carousel.element);
