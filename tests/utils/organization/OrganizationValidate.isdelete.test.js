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

test('should pass validation for a valid `true` value', () => {
    const validIsDeleted = true;
    const { error, value } = organizationUtils.OrganizationValidate(org);
    expect(error).toBeDefined();
    expect(value).toBe(true);
});


test('should pass validation for a valid `false` value', () => {
    const validIsNotDeleted = false;
    const { error, value } = organizationUtils.OrganizationValidate(org);
    expect(error).toBeNull();
    expect(value).toBe(false);
});

test('should fail validation for a non-boolean value', () => {
    const invalidIsDeleted = 'true'; // A string instead of a boolean
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"isDeleted" must be a boolean');
});

test('should fail validation when `isDeleted` field is missing', () => {
    const missingIsDeleted = {};
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"isDeleted" is required');
});

