export class PPU {
    ctx: CanvasRenderingContext2D;
    constructor() {
        let canvas: any = document.getElementById('mainCanvas');
        this.ctx = canvas.getContext("2d");

        this.ctx.fillStyle = "#00FF00";
        this.ctx.fillRect(0, 0, 100, 100);
    }
}