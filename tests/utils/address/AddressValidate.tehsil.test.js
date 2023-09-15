const addressUtils = require("../../../app/utils/AddressUtils");
const addressObj = require("../../../app/models/Address");
const {before} = require("lodash");
let org = {};

beforeEach(() => {
    address = {
        "village": "Dhai",
        "tehsil": "Shikohabad",
        "district": "Etah",
        "state": "Uttar Pradesh",
        "createdBy": "64eb476859e0e17cda46401e"
    };
});

test('should pass validation for a valid tehsil string', () => {
    const {error, value} = addressUtils.validateAddress(address);
    expect(error).toBeUndefined();
    expect(address).toEqual(value);
});

test('should fail validation when tehsil is too short', () => {
    address.tehsil = 'Te';
    const {error} = addressUtils.validateAddress(address);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain("\"tehsil\" length must be at least 3 characters long");
});

test('should fail validation when tehsil contains invalid characters', () => {
    address.tehsil = 'Tehsil@Name'; // Contains "@" character
    const {error} = addressUtils.validateAddress(address);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain("\"tehsil\" with value \"Tehsil@Name\" fails to match the required pattern: /^[A-Za-z ]+$/");
});

test('should fail validation when tehsil is too long', () => {
    address.tehsil = 'tehsilTooLong'.repeat(256); // Exceeds the maximum length
    const {error} = addressUtils.validateAddress(address);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain("\"tehsil\" length must be less than or equal to 50 characters long");
});

test('should fail validation when tehsil field is missing', () => {
    delete address.tehsil // Simulating missing field
    const {error} = addressUtils.validateAddress(address);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('"tehsil" is required');
});

test('should pass validation when tehsil contains spaces', () => {
    address.tehsil = 'Sample Tehsil Name';
    const {error, value} = addressUtils.validateAddress(address);
    expect(error).toBeUndefined();
    expect(address).toStrictEqual(value);
});

