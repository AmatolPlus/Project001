function validateUserDetails(
  firstname: string,
  lastname: string,
  gender: string,
  hobby: string,
  birthday: string,
  email: string,
  profile_id: string,
): boolean {
  const validations = [
    /^[\w.@+\-_\\]{5,25}$/.test(profile_id),
    /^[A-Za-z]+$/.test(firstname),
    /^[A-Za-z]+$/.test(lastname),
    /^(male|female)$/i.test(gender),
    /^[A-Za-z\s]+$/.test(hobby),
    /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/.test(birthday),
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  ];

  return validations.every(isValid => isValid);
}

export {validateUserDetails};
