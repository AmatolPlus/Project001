function validateUserDetails(
  // firstname: string,
  // lastname: string,
  hobby: string,
  website:string,
  // birthday: string,
): boolean {
  const validations = [
    // /^[A-Za-z]+$/.test(firstname),
    /^[A-Za-z]+$/.test(website),
    /^[A-Za-z\s]+$/.test(hobby),
    // /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/.test(birthday),
  ];

  return validations.every(isValid => isValid);
}

function validateUserEmailAndPhone (email,phone,gender):any {
  const validations = [
    // /^[A-Za-z]+$/.test(firstname),
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
    /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(phone),
    /^[Male|Female]+$/.test(gender),
    // /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/.test(birthday),
  ];

  return validations.every(isValid => isValid);
}
export {validateUserDetails,validateUserEmailAndPhone};
