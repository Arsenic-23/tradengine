export const isEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};

export const isPasswordStrong = (password: string): boolean => {
  // Minimum 8 chars, at least one uppercase, one lowercase, one digit
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};
