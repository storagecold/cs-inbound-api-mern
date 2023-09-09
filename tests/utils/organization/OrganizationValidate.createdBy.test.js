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

test('should pass validation for a valid createdBy string', () => {
    const validCreatedBy = 'JohnDoe';
    const { error, value } = organizationUtils.OrganizationValidate(org);
    expect(error).toBeNull();
    expect(value).toBe(validCreatedBy);
});


test('should fail validation when createdBy is too short', () => {
    const createdByTooShort = 'Jo'; // Less than the minimum length
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('Invalid createdBy format');
});

test('should fail validation when createdBy contains invalid characters', () => {
    const invalidCreatedBy = 'John@Doe'; // Contains "@" character
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('Invalid createdBy format');
});

test('should fail validation when createdBy is too long', () => {
    const createdByTooLong = 'A'.repeat(256); // Exceeds the maximum length
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('Invalid createdBy format');
});

test('should fail validation when createdBy field is missing', () => {
    const missingCreatedBy = {};
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('"createdBy" is required');
});



