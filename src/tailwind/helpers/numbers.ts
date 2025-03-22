const formatter = new Intl.NumberFormat('en-US'); // TODO Do not hardcode the locale

export const formatNumber = (number: number | string) => formatter.format(Number(number));

const TEN_ROUNDING_NUMBER = 10;

export const roundTen = (number: number) => Math.ceil(number / TEN_ROUNDING_NUMBER) * TEN_ROUNDING_NUMBER;
