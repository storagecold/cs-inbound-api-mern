const organizationUtils = require("../../../app/utils/OrganizationUtils");
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

test('should pass validation for a valid website URL', () => {
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(value.website).toBe('https://www.abccorp.com');
});

test('should fail validation for an invalid website URL', () => {
    org.website = 'invalid-website';
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('website" must be a valid uri with a scheme matching the http|https pattern');
});

test('should fail validation when website is too long', () => {
    org.website = 'https://' + 'a'.repeat(256); // Exceeds the maximum length
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"website" must be a valid uri with a scheme matching the http|https pattern');
});

test('should fail validation when website field is missing', () => {
    delete org.website;
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"website" is required');
});

test('should fail validation when website does not start with http or https', () => {
    org.Website = 'ftp://www.example.com';
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"Website" is not allowed');
});



