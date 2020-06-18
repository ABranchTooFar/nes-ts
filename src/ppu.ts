import { Display } from "./display.js";

export class PPU {
  display: Display;
  constructor(display: Display) {
    this.display = display;
    for(let i = 0; i < 240; i++) {
        this.display.renderPixel(i, i, "#FF0000");
    }
  }
}
