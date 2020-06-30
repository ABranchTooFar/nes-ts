// 6502 Datasheet!
// http://archive.6502.org/datasheets/rockwell_r650x_r651x.pdf

enum Interrupts {
    NMI,
    RESET,
    IRQ,
    //BRK
}

export class CPU {
    // TODO: Might want to make a "Bus" class to handle simple addressing (i.e. not mapper stuff)
    // 64kb of RAM
    memory: Uint8Array = new Uint8Array(64 * 1024);
    // Internal registers
    // TODO: This should be uint8 or uint16 specifically! Don't know how to do that in TypeScript yet!
    pc: number = 0xFFFC; 
    // TODO: Double check initial values of sp
    sp: number = 0x01FF;
    a: number = 0;
    x: number = 0;
    y: number = 0;
    // TODO: Check if status register is 0 initially
    p: number = 0x34;


}