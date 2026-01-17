export const hexToRGB = (hex: any) => {
    let alpha: boolean = false,
        h = hex.slice(hex.startsWith('#') ? 1 : 0);
    if (h.length === 3) {
        h = [...h].map(x => x + x).join('')
    } else {
        if (h.length === 8) { alpha = true }
    };
    h = parseInt(h, 16);
    return `${(h >>> (alpha ? 24 : 16))}, ${(h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)}, ${((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0))} ${(alpha ? `, ${h & 0x000000ff}` : '')}`
    // return ('rgb' +
    //   (alpha ? 'a' : '') +
    //   '(' + (h >>> (alpha ? 24 : 16)) + ', ' +
    //   ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) + ', ' +
    //   ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    //   (alpha ? `, ${h & 0x000000ff}` : '') + ')'
    // );
};

export const css_var_prefix = '--theme';