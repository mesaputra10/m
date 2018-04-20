export const numberFormat = (nStr) => {
  return nStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default numberFormat;