const addressUtils = require("../../../app/utils/AddressUtils");
let address = {};

beforeEach(() => {
    address = {
        "village": "Dhai",
        "tehsil": "Shikohabad",
        "district": "Etah",
        "state": "Uttar Pradesh",
        "createdBy": "64eb476859e0e17cda46401e"
    };
});

test('should pass validation for a valid village string', () => {
    const {error, value} = addressUtils.validateAddress(address);
    expect(error).toBeUndefined();
    expect(address).toStrictEqual(value);
});

test('should fail validation when village is too short', () => {
    address.village = 'Vi'; // Less than the minimum length
    const {error} = addressUtils.validateAddress(address);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"village\" length must be at least 3 characters long");
});

test('should fail validation when village contains invalid characters', () => {
    address.village = 'Village@123'; // Contains "@" character
    const {error} = addressUtils.validateAddress(address);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"village\" with value \"Village@123\" fails to match the required pattern: /^[A-Za-z ]+$/");
});

test('should fail validation when village is too long', () => {
    address.village = 'A'.repeat(51); // Exceeds the maximum length
    const {error} = addressUtils.validateAddress(address);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"village\" length must be less than or equal to 50 characters long");
});

test('should fail validation when village field is missing', () => {
    delete address.village  // Simulating missing field
    const {error} = addressUtils.validateAddress(address);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('"village" is required');
});

test('should pass validation when village contains spaces', () => {
    address.village = 'Sample Village Name';
    const {error, value} = addressUtils.validateAddress(address);
    expect(error).toBeUndefined(); // Expect no validation error
    expect(address).toStrictEqual(value);
});

 