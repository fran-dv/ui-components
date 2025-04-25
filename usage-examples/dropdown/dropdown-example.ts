import './style.css'
import { createDropdown } from '../../src/components'

const container = document.querySelector('#favourite-food') as HTMLDivElement;
const button = document.querySelector('.food-btn')as HTMLButtonElement;
const content = document.querySelector('#food-options') as HTMLDivElement;

const Dropdown = createDropdown({ container, button, content });

const destroyDropdown = false;

if (destroyDropdown) {
    Dropdown.destroy()
}