const generateMessage = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
  };
};
const generateUrlMessage = (username, location) => {
  return {
    username,
    url: `http://google.com/maps/?q=${location.latitude},${location.longitude}`,
    createdAt: new Date().getTime(),
  };
};

export { generateMessage, generateUrlMessage };
