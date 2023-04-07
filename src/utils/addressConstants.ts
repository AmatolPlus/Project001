export const states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Lakshadweep',
  'Puducherry',
];

export function validateAddressForm(
  city: string,
  state: string,
  address: string,
  pincode: string,
) {
  // Regular expression for matching 6-digit Indian pin codes
  const pincodeRegex = /^[1-9][0-9]{5}$/;

  // Check if all fields are filled
  if (!city || !state || !address || !pincode) {
    return {message: 'Please fill out all fields.', valid: false};
  }

  // Check if the pincode matches the regex pattern
  if (!pincodeRegex.test(pincode)) {
    return {message: 'Please enter a valid pincode.', valid: false};
  }

  // If all checks pass, return null
  return {valid: true};
}
