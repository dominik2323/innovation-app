export const selectInnovationById = (innovations, uid) => {
  if (uid.length === 0) return innovations[0];
  const requestedInnovation = innovations.find(
    innovation => innovation.uid === uid
  );
  return requestedInnovation;
};

export const findAuthor = (author, humans) => {
  const authorData = humans.find(human => human.uid === author.humans.uid);
  return {
    ...authorData,
    isGarant: author.role === `Garant`,
  };
};
