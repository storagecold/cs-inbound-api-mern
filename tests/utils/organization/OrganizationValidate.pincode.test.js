const organizationUtils = require("../../../app/utils/OrganizationUtils");
const OrganizationObj = require("../../../app/models/Organization");
const {before} = require("lodash");
let org = {};

beforeEach(() => {
    org = {
        name: "Lodhi Rajput Corporation",
        email: "lodhirajputcorporation@gmail.com",
        phone: "(05675) 3536112",
        mobile: "8006426254",
        industry: "Cold Storage",
        website: "https://www.abccorp.com",
        address: {
            cityVillage: "Shikohabad",
            district: "Firocabad",
            state: "Uttar Pradesh",
            pinCode: 205145,
        },
        logo: {
            originalName: "logo.png",
            location: "https://www.abccorp.com/logo.png",
            key: "logo_123",
        },
        owner: ["Rajendra Prasad", "Ram Gopal", "Mohan Dutt"],
    };
});

test('should pass validation for a valid 6-digit pin code', () => {
    const validPinCode = {
        pinCode: 123456,
    };
    const { error, value } = organizationUtils.OrganizationValidate(org);
    expect(error).toBeUndefined();
    expect(value.pinCode).toContain(123456);
});


test('should fail validation for a non-integer value', () => {
    const nonIntegerPinCode = {
        pinCode: 123.45, // Non-integer value
    };
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"pinCode" must be an integer');
});

test('should fail validation for a 5-digit pin code', () => {
    const shortPinCode = {
        pinCode: 12345, // 5-digit pin code
    };
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"pinCode" must be greater than or equal to 100000');
});

test('should fail validation for a 7-digit pin code', () => {
    const longPinCode = {
        pinCode: 1234567, // 7-digit pin code
    };
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"pinCode" must be less than or equal to 999999');
});

test('should fail validation when pinCode field is missing', () => {
    const missingPinCode = {};
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"pinCode" is required');
});
