export const selectInnovationById = (innovations, uid) => {
  let requestedInnovation;

  if (uid.length === 0) {
    requestedInnovation = innovations.find(
      ({ node }) => Object.values(node).length !== 0
    );

    return requestedInnovation?.node;
  }

  // TODO: add error handling, when uid is bullshit
  requestedInnovation = innovations.find(
    ({ node }) => node?._meta?.uid === uid
  );

  return requestedInnovation?.node;
};
