module.exports = async function resolvePromises(arr) {
  for (let i = 0; i <= arr.length; i++) {
    let item = arr[i];
    typeof item === `function` && (await item());
  }
};
