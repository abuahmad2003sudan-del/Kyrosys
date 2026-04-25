import canvasConfetti from 'canvas-confetti';

let customCanvas: HTMLCanvasElement | null = null;
let confettiInstance: any = null;

export const confetti = (options: any) => {
  if (typeof document !== 'undefined' && !customCanvas) {
    customCanvas = document.createElement('canvas');
    customCanvas.style.position = 'fixed';
    customCanvas.style.top = '0';
    customCanvas.style.left = '0';
    customCanvas.style.width = '100vw';
    customCanvas.style.height = '100vh';
    customCanvas.style.pointerEvents = 'none';
    customCanvas.style.zIndex = '9999';
    document.body.appendChild(customCanvas);
    
    confettiInstance = canvasConfetti.create(customCanvas, { 
      resize: true, 
      useWorker: false 
    });
  }
  
  if (confettiInstance) {
    return confettiInstance(options);
  }
};
