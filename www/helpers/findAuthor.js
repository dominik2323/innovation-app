export const findAuthor = (author, humans) => {
  const authorData = humans.find((human) => human.uid === author.humans.uid);
  return {
    ...authorData,
    isGarant: author.role === `Garant`,
  };
};
