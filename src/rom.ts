// https://wiki.nesdev.com/w/index.php/INES
const HEADER_SIZE = 16;
const VALID_SIGNATURE = "NES";
const VALID_MAGIC_NUMBER = 0x1a;
const SIGNATURE_ADDRESS = 0;
const MAGIC_NUMBER_ADDRESS = 3;
const PRG_BANKS_NUM_ADDRESS = 4;
const CHR_BANKS_NUM_ADDRESS = 5;
const CONTROL_BYTE1_ADDRESS = 6;
const CONTROL_BYTE2_ADDRESS = 7;
const RAM_BANKS_NUM_ADDRESS = 8;
// TODO: There are more bytes that are rarely used

export class ROM {
    // TODO: Most of these don't need to be members anymore
    romDataView: DataView;
    signature: String = "";
    magicNumber: number;
    prgBanksNum: number;
    prgRomSize: number;
    prgRomData: DataView;
    chrBanksNum: number;
    chrRomSize: number;
    chrRomOffset: number;
    chrRomData: DataView;
    controlByte1: number;
    controlByte2: number;

    constructor(romData: ArrayBuffer) {
        console.log("New ROM object created.");

        this.romDataView = new DataView(romData);

        // This is generally how it is done in nes-js
        // BUT there has to be a better way, right?
        for(let i = 0; i < 3; i++) {
            this.signature += String.fromCharCode(this.romDataView.getUint8(SIGNATURE_ADDRESS + i));
        }
        this.magicNumber = this.romDataView.getUint8(MAGIC_NUMBER_ADDRESS);
        this.prgBanksNum = this.romDataView.getUint8(PRG_BANKS_NUM_ADDRESS);
        this.prgRomSize = this.prgBanksNum * 0x4000;

        // TODO: Skip trainer data if present
        this.prgRomData = new DataView(romData, HEADER_SIZE, this.prgRomSize);

        this.chrRomOffset = HEADER_SIZE + this.prgRomSize;
        this.chrBanksNum = this.romDataView.getUint8(CHR_BANKS_NUM_ADDRESS);
        this.chrRomSize = this.chrBanksNum * 0x2000;

        this.chrRomData = new DataView(romData, this.chrRomOffset, this.chrRomSize)

        this.controlByte1 = this.romDataView.getUint8(CONTROL_BYTE1_ADDRESS);
        this.controlByte2 = this.romDataView.getUint8(CONTROL_BYTE2_ADDRESS);

        this.dumpHeader();
    }

    // TODO: This is only for debugging
    chrLoad(address: number): number {
        return this.chrRomData.getUint8(address);
    }
    
    dumpHeader() {
        console.log("--- Header Dump ---");
        console.log("Header Signature: " + this.signature);
        console.log("Magic number: 0x" + this.magicNumber.toString(16));
        if (this.signature === VALID_SIGNATURE && this.magicNumber === VALID_MAGIC_NUMBER) {
            console.log("Valid ROM header");
        } else {
            console.warn("Invalid ROM header");
        }
        console.log("Number of PRG Banks: " + this.prgBanksNum);
        console.log("CHR ROM Offset: 0x" + this.chrRomOffset.toString(16));
        console.log("Number of CHR Banks: " + this.chrBanksNum);
        console.log("Control byte 1: 0x" + this.controlByte1);
        console.log("Control byte 2: 0x" + this.controlByte2);
    }
}