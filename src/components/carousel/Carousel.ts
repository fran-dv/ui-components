import './carousel.css';
import arrowSVG from '../../assets/image/arrow.svg'
import { generateDiv } from '../DivGenerator/DivGenerator';

const DEFAULT_INDEX = 0;

interface Image {
    url: string;
    alt?: string;
    title?: string;
}

interface CarouselProps {
    images: Image[];
}

enum Classes {
    nextImage = 'next',
    previousImage = 'previous',
    dotsContainer = 'dots',
    dot = 'dot',
    selectedDot = 'selected',
    carousel = 'carousel',
    frame = 'frame',
    activeFrame = 'active',
}

enum CustomAttr {
    index = 'index',
    click = 'click',
}

enum DataClick {
    dot = 'dot',
    arrowNext = 'next',
    arrowPrevious = 'previous',
}

interface Carousel {
    element: HTMLDivElement;
    destroy: () => void;
}

interface CarouselDots {
    insertDot: (index: number) => void;
    toggleDotSelection: (index: number) => void;
    destroy: () => void;
}

interface DotsProps {
    parent: HTMLDivElement;
}

type Dot = HTMLDivElement | null ;

interface FrameIndexRef {
    value: number | null;
}

const appendSideArrows = (container: HTMLDivElement) => {
    [Classes.previousImage, Classes.nextImage].forEach((klass) => {
        const currentArrow = klass === Classes.previousImage ? DataClick.arrowPrevious : DataClick.arrowNext;
        const div = generateDiv({ 
            classes: [klass], 
            customAttrs: [{ name: CustomAttr.click, value: currentArrow }]
        })
        const img = document.createElement('img')
        img.src = arrowSVG;
        img.alt = `${klass} image`;
        div.appendChild(img)
        container.appendChild(div)
    })
}

const createDotsContainer = ({ parent }: DotsProps): CarouselDots => {
    const dotsContainer = generateDiv({ classes: [Classes.dotsContainer] })

    let selectedDotIx: number | null = null;

    const _getDotByIndex = (index: number): Dot => { // returns null if dot does not exists
        return dotsContainer.querySelector(`.${Classes.dot}[data-index="${index}"]`);
    }

    const toggleDotSelection = (index: number) => {
        const dotToSelect = _getDotByIndex(index);
        if (!dotToSelect){
            console.error(`Dot with index ${index} does not exists`)
            return;
        }

        if (selectedDotIx !== null) {
            const selectedDot = _getDotByIndex(selectedDotIx)
            selectedDot?.classList.remove(Classes.selectedDot)
        }
        selectedDotIx = index;
        dotToSelect.classList.add(Classes.selectedDot)
    }

    const _createDot = (index: number) => {
        const dot = generateDiv({ 
            classes: [
                Classes.dot
            ], 
            customAttrs: [
                { name: CustomAttr.index, value: `${index}`},
                { name: CustomAttr.click, value: DataClick.dot}
            ]
        })
        return dot;
    }

    const insertDot = (index: number) => {
        const dot = _createDot(index);
        dotsContainer.appendChild(dot)

        if (index === DEFAULT_INDEX) {
            toggleDotSelection(index);
        }
    }

    const destroy = () => {
        dotsContainer.remove();
    }

    parent.appendChild(dotsContainer);

    return {
        toggleDotSelection,
        insertDot,
        destroy,
    }
}

const getImgElem = (image: Image): HTMLImageElement => {
    const img = document.createElement('img');
    if (image.alt) {
        img.alt = image.alt;
    }
    if (image.title) {
        img.title = image.title;
    }
    img.src = image.url;

    return img;
}

const appendImageFrames = (container: HTMLDivElement, images: Image[], Dots: CarouselDots, activeFrameIx: FrameIndexRef) => {
    let index = 0;
    images.forEach((image) => {
        const frame = generateDiv({ 
            classes: [Classes.frame],
            customAttrs: [{ name: CustomAttr.index, value: `${index}` }],
        })
        if (index === DEFAULT_INDEX) {
            frame.classList.add(Classes.activeFrame)
            activeFrameIx.value = index;
        }
        const img = getImgElem(image)
        frame.appendChild(img)

        container.appendChild(frame)
        Dots.insertDot(index)

        index++;
    })
}

export const createCarousel = ({ images }: CarouselProps): Carousel => {
    const container = generateDiv({ classes: [Classes.carousel]})
    const maxIndex = images.length - 1;

    appendSideArrows(container)
    const Dots = createDotsContainer({ parent: container });

    const activeFrameIx: FrameIndexRef = { value: (null as number | null) };
    appendImageFrames(container, images, Dots, activeFrameIx);

    const getFrameByIndex = (index: number): HTMLDivElement | null => {
        return container.querySelector(`.${Classes.frame}[data-index="${index}"]`)
    }

    const toggleActiveFrame = (index: number) => {
        if (activeFrameIx.value !== null) {
            const active = getFrameByIndex(activeFrameIx.value)
            active?.classList.remove(Classes.activeFrame)
        }   
        const frameToActive = getFrameByIndex(index)
        frameToActive?.classList.add(Classes.activeFrame)
        activeFrameIx.value = index;
    }
    
    const changeFrame = (index: number) => {
        toggleActiveFrame(index)
        Dots.toggleDotSelection(index)
    }

    const handleClick = (e: MouseEvent) => {
        const target: HTMLElement | null = (e.target as HTMLElement).closest(`[data-${CustomAttr.click}]`)

        if (!target) { return }
        
        const dataIndexStr = target.dataset[CustomAttr.index];

        let index: number | null = null;
        switch (target.dataset[CustomAttr.click]) {
            case DataClick.dot:
                if (dataIndexStr !== undefined) {
                    index = parseInt(dataIndexStr)
                }
                break;
            case DataClick.arrowPrevious:
                index = activeFrameIx.value !== null ? activeFrameIx.value - 1 : null;
                if (index !== null && index < 0){
                    index = maxIndex;
                }
                break;
            case DataClick.arrowNext:
                index = activeFrameIx.value !== null ? activeFrameIx.value + 1 : null;
                if (index !== null && index > maxIndex){
                    index = 0;
                }
                break;
        }

        if (index !== null) {
            changeFrame(index)
        }        
    }

    const handler = (e: MouseEvent) => handleClick(e)

    container.addEventListener('click', handler)

    const destroy = () => {
        container.removeEventListener('click', handler)
        Dots.destroy();
        container.remove()
    }

    return {
        element: (container as HTMLDivElement),
        destroy
    }
}