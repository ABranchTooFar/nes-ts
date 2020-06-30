import { Display } from "./display.js";
import { ROM } from "./rom.js";

export class PPU {
  display: Display;
  rom: ROM;

  constructor(display: Display) {
    this.display = display;
    for (let i = 0; i < 240; i++) {
        this.display.renderPixel(i, i, "#FF0000");
    }
  }

  loadRom(rom: ROM): void {
    // TODO: Stupid code to verify CHR is correct and display works
    this.rom = rom;
    let palette = ["#9290FF", "#B53120", "#EA9E22", "#6B6D00"];
    for (let i = 0; i < 256; i++) {
      this.renderTile((i % 16) * 8, Math.floor(i / 16) * 8, 0, i, palette);
    }
  }

  renderTile(xOffset: number, yOffset: number, patternTable: number, tileIndex: number, palette: string[]): void {
    // Code to test CHR ROM
    // TODO: Implement pattern table select
    for (let y = 0; y < 8; y++) {
      let byte1 = this.rom.chrLoad((tileIndex * 16) + y);
      let byte2 = this.rom.chrLoad((tileIndex * 16) + y + 8)
      for (let x = 0; x < 8; x++) {
        let paletteIndex: number = (byte1 >>> (7 - x) & 1) | ((byte2 >>> (7 - x) & 1) << 1);
        let color = palette[paletteIndex];
        this.display.renderPixel(x + xOffset, y + yOffset, color)
      }
    }
  }
}
