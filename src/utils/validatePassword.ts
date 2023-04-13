type ValidationResult = {
  valid: boolean;
  error?: string;
};

const validatePassword = ({
  old_password,
  password1,
  password2,
}: any): ValidationResult => {
  if (!old_password || !password1 || !password2) {
    return {valid: false, error: 'All fields are required.'};
  }

  const hasDigit = /\d/.test(password1);

  if (!hasDigit || password1.length < 5) {
    return {valid: false, error: 'New password must meet the requirements.'};
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
