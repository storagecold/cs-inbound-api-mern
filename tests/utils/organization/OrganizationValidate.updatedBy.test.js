const organizationUtils = require("../../../app/utils/OrganizationUtils");
const OrganizationObj = require("../../../app/models/Organization");
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

test('should pass validation for a valid updatedBy string', () => {
    const validUpdatedBy = 'JaneSmith';
    const { error, value } = organizationUtils.OrganizationValidate(org);
    expect(error).toBeNull();
    expect(value).toBe(validUpdatedBy);
});

test('should fail validation when updatedBy is too short', () => {
    const updatedByTooShort = 'Jo'; // Less than the minimum length
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('Invalid updatedBy format');
});

test('should fail validation when updatedBy contains invalid characters', () => {
    const invalidUpdatedBy = 'Jane@Smith'; // Contains "@" character
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('Invalid updatedBy format');
});

test('should fail validation when updatedBy is too long', () => {
    const updatedByTooLong = 'A'.repeat(256); // Exceeds the maximum length
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('Invalid updatedBy format');
});

test('should fail validation when updatedBy field is missing', () => {
    const missingUpdatedBy = undefined; // Simulating missing field
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('"updatedBy" is required');
});

test('should pass validation when updatedBy contains spaces', () => {
    const updatedByWithSpaces = 'Jane Smith';
    const { error, value } = organizationUtils.OrganizationValidate(org);
    expect(error).toBeNull();
    expect(value).toBe(updatedByWithSpaces);
});

