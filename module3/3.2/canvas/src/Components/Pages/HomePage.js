import { renderHeaderTitle } from '../../utils/render';

const EXPECTED_RECT_COUNT = 101;
let DEFAULT_SHAPE_SIDE = 20;
let DEFAULT_COLOR = 'blue'; // 'rgba(255,0,0,0.5)';

/**
 * WARNING : THE STROBOSCOPIC EFFECT OF THIS DEMO COULD LEAD TO EPILEPSY !!!
 * PLEASE DON'T EXECUTE THIS DEMO IF YOUR ARE SUBJECT TO EPILEPSY !
 */

const HomePage = () => {
  const main = document.querySelector('main');
  const mainWidth = main.clientWidth;
  const mainHeight = main.clientHeight;
  let canvas;
  let canvasContext;
  let animationRunning = true;

  renderHeaderTitle('Canvas Animation');
  renderCanvasWrapper();
  setCanvasContextAndSize();
  removePotentialVerticalAndHorizontalScrollbars();
  requestAnimationFrame(drawOneFrame);

  function renderCanvasWrapper() {
    main.innerHTML = '<canvas />';
    canvas = document.querySelector('canvas');
  }

  function setCanvasContextAndSize() {
    canvasContext = canvas.getContext('2d');
    canvas.width = mainWidth;
    canvas.height = mainHeight;
  }

  /**
   * This function remove the vertical scrollbar that spuriously appears
   * even though the canvas is not meant to extend beyond the height
   * of the browser windows.
   */
  function removePotentialVerticalAndHorizontalScrollbars() {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  }

  function drawOneFrame() {
    if (!animationRunning) {
      return;
    }
    clearFrame();

    drawRectanglesAtRandomLocations();
    // drawAlwaysFullRectanglesAtRandomLocations();

    requestAnimationFrame(drawOneFrame);

    // requestAnimationFrame(() => setTimeout(drawOneFrame, 1000));
  }

  function clearFrame() {
    canvasContext.clearRect(0, 0, mainWidth, mainHeight);
  }

  function drawRectanglesAtRandomLocations() {
    canvasContext.fillStyle = DEFAULT_COLOR;

    for (let i = 0; i < EXPECTED_RECT_COUNT; i += 1) {
      canvasContext.fillRect(
        Math.random() * mainWidth,
        Math.random() * mainHeight,
        DEFAULT_SHAPE_SIDE,
        DEFAULT_SHAPE_SIDE,
      );
    }
  }

  window.addEventListener('click', (e) => {
    if (e.button === 0) { // Vérifiez si le bouton gauche de la souris est cliqué
      animationRunning = !animationRunning;
      if (animationRunning) {
        drawOneFrame();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '+') {
      console.log('augmenter la taille');
      console.log('Before:', DEFAULT_SHAPE_SIDE);
      DEFAULT_SHAPE_SIDE += 1;
      drawOneFrame(DEFAULT_SHAPE_SIDE, DEFAULT_SHAPE_SIDE);
      console.log('After:', DEFAULT_SHAPE_SIDE);
    }
    if (e.key === '-') {
      console.log('reduire la taille');
      console.log('Before:', DEFAULT_SHAPE_SIDE);
      DEFAULT_SHAPE_SIDE -= 1;
      drawOneFrame(DEFAULT_SHAPE_SIDE, DEFAULT_SHAPE_SIDE);
      console.log('After:', DEFAULT_SHAPE_SIDE);
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const r = Math.floor(Math.random() * 256); // [0,255];
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    DEFAULT_COLOR = `rgb(${r}, ${g}, ${b})`;
    console.log('color : ', DEFAULT_COLOR);
    drawOneFrame();
  });

  /* function drawAlwaysFullRectanglesAtRandomLocations() {
    canvasContext.fillStyle = DEFAULT_COLOR;

    for (let i = 0; i < EXPECTED_RECT_COUNT; i += 1) {
      const randomX = Math.random() * mainWidth;
      let expectedX = randomX;
      if (randomX < DEFAULT_SHAPE_SIDE) expectedX = 0;
      else if (randomX > mainWidth - DEFAULT_SHAPE_SIDE) expectedX = mainWidth - DEFAULT_SHAPE_SIDE;

      const randomY = Math.random() * mainHeight;
      let expectedY = randomY;
      if (randomY < DEFAULT_SHAPE_SIDE) expectedY = 0;
      else if (randomY > mainHeight - DEFAULT_SHAPE_SIDE) {
        expectedY = mainHeight - DEFAULT_SHAPE_SIDE;
      }

      canvasContext.fillRect(expectedX, expectedY, DEFAULT_SHAPE_SIDE, DEFAULT_SHAPE_SIDE);
    }
  } */
};

export default HomePage;
