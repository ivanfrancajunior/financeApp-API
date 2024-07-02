export const generateHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(8);

  const hashed_password = await bcrypt.hash(password, salt);

  return hashed_password;
};
