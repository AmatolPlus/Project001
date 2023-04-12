function validateUserDetails(
  firstname: string,
  lastname: string,
  gender: string,
  hobby: string,
  birthday: string,
  email: string,
): boolean {
  const validations = [
    /^[A-Za-z]+$/.test(firstname),
    /^[A-Za-z]+$/.test(lastname),
    /^(male|female)$/i.test(gender),
    /^[A-Za-z\s]+$/.test(hobby),
    /^\d{4}-\d{2}-\d{2}$/.test(birthday),
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  ];

  return validations.every(isValid => isValid);
}

export {validateUserDetails};
