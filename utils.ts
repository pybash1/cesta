export const uuid = (): string =>
  new Date().getTime().toString(36) + Math.random().toString(36).slice(2);

export const getLabel = (): string => {
  let inp = prompt("Enter node text: ");
  while (!inp) {
    inp = prompt("Enter node text: ");
  }
  return inp;
};
