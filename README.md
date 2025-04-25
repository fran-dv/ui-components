# **UI Components**

Basic reusable UI components such as div generator or dropdown menu. This project was provided by The Odin Project as part of the JavaScript full-stack curriculum. However, I approached it with a personal touch: using **TypeScript** instead of JavaScript, and **Vite** instead of Webpack. This way, the project aligns with current standards and practices. Additionally, I published the package on npm for future reuse.

---

## 🌟 Features

- **Dropdown** (`createDropdown`): Easy-to-use, reusable dropdown with open/close logic and cleanup.
- **Carousel** (`createCarousel`): Dynamic image slider with next/previous navigation, dot indicators.
- **Div Generator** (`generateDiv`): Utility to create `<div>` elements with optional classes, IDs, and custom `data-*` attributes.

*All components are implemented in TypeScript with strict types, no external dependencies*

---

## ⚙️ Installation

Install from npm:

```bash
npm i @fran-dv/ui-components
```

Then, simply import the components you need:

```ts
import { createDropdown, createCarousel, generateDiv } from '@fran-dv/ui-components';
```
The components come with basic, essential styling (such as required positioning, etc.) but can easily be overridden. You can style all components using standard CSS. Since the components are built with regular HTML elements and classes, customizing them through your stylesheets or utility classes (like Tailwind, Bootstrap, etc.) works seamlessly.

---

## 📚 API Reference

## Div generator

### `generateDiv(props: DivProps): HTMLDivElement`

Generate a `<div>` with optional classes, ID, and custom data attributes.

**Props**:

- `classes?: string[]` — Array of class names to add.
- `id?: string` — `id` attribute.
- `customAttrs?: { name: string; value: string }[]` — Data attributes (camelCase maps to `data-name`).

Usage example:
```ts
import { generateDiv } from '@fran-dv/ui-components'

const box = generateDiv({
  classes: ['card', 'shadow'],
  id: 'main-card',
  customAttrs: [{ name: 'click', value: 'pop-up' }]
})
document.body.appendChild(box)
```

## Carousel
### `createCarousel(props: CarouselProps): Carousel`

Initialize a carousel component.

- **Props**:

  - `images: { url: string; alt?: string; title?: string }[]`

- **Returns** `Carousel`:

  - `element: HTMLDivElement` — the root element.
  - `destroy(): void` — remove event listeners and DOM nodes.

Usage example:
```ts
const carousel = createCarousel({ images })
parent.appendChild(carousel.element)
// cleanup:
// carousel.destroy()
```

## Dropdown

### `createDropdown(props: DropdownProps): { destroy: () => void }`

Initialize a dropdown component on existings elements.

- **Props**:
  - `container: HTMLDivElement`
  - `button: HTMLButtonElement`
  - `content: HTMLDivElement`

Usage example:
```ts
const container = document.querySelector('#drop-container')
const buttton = container.querySelector('button')
const content = container.querySelector('.options-container')

const dropdown = createDropdown({ container, button, content })
// to remove listeners:
// dropdown.destroy()
```

---

## 🛠️ Built With

- **TypeScript**
- **Vite**
- **ESLint & Prettier**

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo, and submit a pull request.



