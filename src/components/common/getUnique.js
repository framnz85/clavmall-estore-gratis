const getUnique = (origData, newData) => {
  const result =
    newData &&
    newData.filter((newD) => {
      const existData = origData.filter((oldD) => oldD._id === newD._id);
      return !existData.length;
    });
  return [...origData, ...result];
};

export default getUnique;
