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
            village: "Shikohabad",
            district: "Firocabad",
            tehsil: "Shikohabad",
            state: "Uttar Pradesh",
            pinCode: 205145,
        },
        logo: {
            originalName: "logo.png", location: "https://www.abccorp.com/logo.png", key: "logo_123",
        },
        owner: ["Rajendra Prasad", "Ram Gopal", "Mohan Dutt"],
    }
});

test('should pass validation for a valid 6-digit pin code', () => {
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeUndefined();
    expect(value).toStrictEqual(org);
});

test('should fail validation for a non-integer value', () => {
    org.address.pinCode = "abc";
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error.message).toContain('"address.pinCode" must be a number');
});

test('should fail validation for a 5-digit pin code ', () => {
    org.address.pinCode = 12345;
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error.message).toContain('"address.pinCode" must be greater than or equal to 100000');
});

test('should fail validation for a 7-digit pin code', () => {
    org.address.PinCode = 1234567;
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error.message).toEqual("\"address.PinCode\" is not allowed");
});

test(" should fail Validation when  pinCode field is missing", () => {
    delete org.address.pinCode;
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error.message).toEqual('"address.pinCode" is required');
});