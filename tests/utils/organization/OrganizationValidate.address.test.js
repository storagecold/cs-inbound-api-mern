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


test('should pass validation for a valid city or village name', () => {
    const {error, value} = organizationUtils.organizationValidate(org);
    expect(error).toBeUndefined();
    expect(value).toEqual(org);
});

test('should pass validation for a valid address object', () => {
    org.Address = {
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 456',
    };
    const {error, value} = organizationUtils.organizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("");
});

test('should pass validation when address lines are empty', () => {
    org.Address = {
        addressLine1: '',
        addressLine2: '',
    };
    const {error, value} = organizationUtils.organizationValidate(org);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain("");
});

test('should fail validation when addressLine1 is too short', () => {
    org.Address = {
        addressLine1: 'A',
        addressLine2: 'Apt 456',
    };
    const {error} = organizationUtils.organizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("");
});

test('should fail validation when addressLine2 is too long', () => {
    org.Address = {
        addressLine1: '123 Main Street',
        addressLine2: 'Apartment 456, Building C',
    };
    const {error} = organizationUtils.organizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('');
});




