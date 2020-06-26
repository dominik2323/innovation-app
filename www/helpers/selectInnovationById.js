export const selectInnovationById = (innovations, uid) => {
  if (uid.length === 0) return innovations[0];
  const requestedInnovation = innovations.find(
    (innovation) => innovation.uid === uid
  );
  return requestedInnovation;
};
