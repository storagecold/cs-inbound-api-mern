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

test('should fail validation when originalName is missing', () => {
    const missingOriginalName = {
        logo: {
            location: 'https://example.com/logo.png',
            key: 'logo_key',
        },
    };
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toBe('Original name is required');
});


test('should pass validation for a valid logo object', () => {
    const validLogo = {
        logo: {
            originalName: 'logo.png',
            location: 'https://example.com/logo.png',
            key: 'logo_key',
        },
    };
    const { error, value } = organizationUtils.OrganizationValidate(org);
    expect(error).toBeUndefined();
    expect(value.logo).toEqual(validLogo.logo);
});
test('should fail validation when location is not a valid URL', () => {
    const invalidLocation = {
        logo: {
            originalName: 'logo.png',
            location: 'invalid-url', // Invalid URL format
            key: 'logo_key',
        },
    };
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('Invalid logo location format');
});

test('should fail validation when key is missing', () => {
    const missingKey = {
        logo: {
            originalName: 'logo.png',
            location: 'https://example.com/logo.png',
        },
    };
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('Logo key is required');
});

test('should fail validation when logo field is missing', () => {
    const missingLogo = {};
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"logo" is required');
});