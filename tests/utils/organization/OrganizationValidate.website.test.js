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

test('should pass validation for a valid website URL', () => {
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeUndefined();
    expect(value.website).toBe('https://www.abccorp.com');
});

test('should pass validation when website field is empty', () => {
    org.website = "";
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.message).toContain('"website" is not allowed to be empty');
    expect(value.website).toBe('https://www.abccorp.com');
});
test('should fail validation for an invalid website URL', () => {
    org.website = 'example.com';// Missing protocol and domain
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error)
    not.toBeUndefined();
    expect(error.details[0].message).toBe('"https://www.abccorp.com');
});

test('should fail validation for a website exceeding the maximum 25 length', () => {
    org.website = 'https://example.com/https:/bgjk';
    const {error} = organizationUtils.OrganizationVlxzcvalidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"website" length must be less than or equal to 25');
});
