import { Display } from "./display.js";
import { PPU } from "./ppu.js";

export class NES {
  ppu: PPU;
  constructor(canvas: HTMLCanvasElement) {
    // Might want to access Display from here in the future to draw NES debugging information
    this.ppu = new PPU(new Display(canvas));
  }
}
