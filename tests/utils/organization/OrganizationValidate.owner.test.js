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

test('should pass validation for an array of valid owner names', () => {
    const validOwners = ["Rajendra Prasad", "Ram Gopal", "Mohan Dutt"];
    const { error, value } = organizationUtils.OrganizationValidate(org);
    expect(error).toBeDefined();
    expect(value).toEqual(validOwners);
});

test('should fail validation when owner names are missing', () => {
    const missingOwners = [];
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('At least one owner is required');
});

test('should fail validation when an owner name is less than 3 characters', () => {
    const invalidOwnerName = ['Jo', 'Alice Smith'];
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('Invalid owner name format');
});

test('should fail validation when an owner name contains special characters', () => {
    const invalidOwnerName = ['John@Doe', 'Alice Smith'];
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('Invalid owner name format');
});

test('should fail validation when owner names array is missing', () => {
    const missingOwnersArray = {};
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"owner" is required');
});
