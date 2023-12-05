// a function that generate a six alpha-numerical characters string password
const generatePassword = () => {
  const password = Math.random().toString(36).slice(-8);
  return password;
};

export { generatePassword };
