


export const convertUsername = (name: string) => {
  const nameConvert = name.split(" ");
  const first = nameConvert[0].charAt(0);
  const end = nameConvert[nameConvert.length - 1].charAt(0);
  const result = (first + end).toString().toUpperCase();
  if (nameConvert.length < 2) {
    return first.toString().toUpperCase();
  } else {
    return result;
  }
};
