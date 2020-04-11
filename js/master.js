const imageContainer = document.querySelector('.image-container')
const length = imageContainer.children.length;
imageContainer.style.setProperty('--image-count', length)

imageContainer.addEventListener('pointerdown', onClickDown);
imageContainer.addEventListener('pointermove', onMove, false);
imageContainer.addEventListener('pointerup', onClickUp);
addEventListener('resize', getWindowWidth, false);

let clickDownX = null;
let currentImage = 0;
let windowWidth;

function getWindowWidth() { 
    windowWidth = window.innerWidth
};

function onMove(e){
    if(clickDownX !== null){
        e.preventDefault();
        const changeInX = e.clientX - clickDownX
        imageContainer.style.setProperty('--shift-amount', changeInX + 'px')
    }
}

function onClickDown(e) {
    clickDownX = e.clientX
    imageContainer.classList.toggle('image-transition', false)
};

function onClickUp(e) {
    if(clickDownX !== null) {
        const changeInX = e.clientX - clickDownX
        const magnitude = Math.sign(changeInX);
        var factorMoved = +(magnitude*changeInX/windowWidth).toFixed(2);
      
        if((currentImage > 0 || magnitude < 0) && (currentImage < length - 1 || magnitude > 0) && factorMoved > 0.25){
          imageContainer.style.setProperty('--current-image', currentImage -= magnitude);
          factorMoved = 1 - factorMoved
        }

        imageContainer.style.setProperty('--shift-amount', '0px');
        imageContainer.style.setProperty('--factor-moved', factorMoved)
        imageContainer.classList.toggle('image-transition', true)

        clickDownX = null
    }
};

getWindowWidth()