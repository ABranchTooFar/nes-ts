const width = 256;
const height = 240;

export class Display {
  pixelWidth: number;
  pixelHeight: number;
  ctx: CanvasRenderingContext2D;
  constructor(canvas: any) {
    this.ctx = canvas.getContext("2d");
    //this.ctx.imageSmoothingEnabled = false;

    this.pixelWidth = canvas.width/width;
    if (!Number.isInteger(this.pixelWidth)) {
        console.warn("Non-integer width scaling!");
    }

    this.pixelHeight = canvas.height/height;
    if (!Number.isInteger(this.pixelHeight)) {
        console.warn("Non-integer height scaling!");
    }
  }

  // TODO: Change c to a color enum? 
  renderPixel(x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    // Be careful to not render 1/2 pixels!
    // Will need to calculate pixel width and height from canvas width and height
    this.ctx.fillRect(x * this.pixelWidth, y * this.pixelHeight, this.pixelWidth, this.pixelHeight);
  }
}
