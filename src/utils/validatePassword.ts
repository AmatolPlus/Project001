type ValidationResult = {
  valid: boolean;
  error?: string;
};

const validatePassword = ({
  password1,
  password2,
  first_name,
  last_name,
}: any): ValidationResult => {
  if (!password1 || !password2) {
    return {valid: false, error: 'All fields are required.'};
  }

  const hasDigit = /\d/.test(password1);

  if (!hasDigit || password1.length < 5) {
    return {valid: false, error: 'New password must meet the requirements.'};
  }

  if (first_name < 3 || last_name < 3) {
    return {
      valid: false,
    };
  }
  if (password1 !== password2) {
    return {
      valid: false,
      error: 'New password and confirm password do not match.',
    };
  }

  return {valid: true};
};
export {validatePassword};
