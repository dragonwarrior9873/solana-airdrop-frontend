export const numberWithCommas = (x, digits = 3) => {
    if (!x) return '0';
    return Number(x).toLocaleString(undefined, { maximumFractionDigits: digits });
}