// @flow
export const time = () => {
  const date = new Date();
  return `${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
};
