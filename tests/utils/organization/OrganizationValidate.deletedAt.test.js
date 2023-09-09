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

test('should pass validation for a valid date value', () => {
    const validDeletedAt = '2023-09-05T12:34:56Z';
    const { error, value } = organizationUtils.OrganizationValidate(org);
    expect(error).toBeDefined();
    expect(value.toISOString()).toBe('2023-09-05T12:34:56.000Z');
});


test('should pass validation for a null value', () => {
    const nullDeletedAt = null;
    const { error, value } = organizationUtils.OrganizationValidate(org);
    expect(error).toBeNull();
    expect(value).toBeNull();
});

test('should fail validation for a non-boolean value', () => {
    const invalidIsDeleted = 'true'; // A string instead of a boolean
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"isDeleted" must be a boolean');
});

test('should fail validation when deletedAt field is missing', () => {
    const missingDeletedAt = {};
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('"deletedAt" is required');
});



