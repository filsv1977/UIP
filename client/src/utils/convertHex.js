export const hexEncode = str => {
    let hex, i;
    let result = '';
    for (i = 0; i < str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += ('000' + hex).slice(-4);
    }
    return result;
};

export const hexDecode = str => {
    if (!str) return '';

    let j;
    const hexes = str.match(/.{1,4}/g) || [];
    let back = '';
    for (j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
};
