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

test('should pass validation for an array of valid owner names', () => {
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeUndefined();
    expect(value.owner).toEqual(org.owner);
});

test('should fail validation when owner is missing', () => {
    delete org.owner;
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.message).toEqual('"owner" is required');
});

test('should fail validation when owner names are missing', () => {
    org.owner = [];
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"owner" does not contain 1 required value(s)');
});

test('should fail validation when an owner name is less than 3 characters', () => {
    org.owner = ['Jo', 'Alice Smith'];
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"owner[0]" length must be at least 3 characters long');
});

test('should fail validation when an owner name contains special characters', () => {
    org.owner = ['John@Doe', 'Alice Smith'];
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"owner[0]" with value "John@Doe" fails to match the required pattern: /^[a-zA-Z\\s]+$/');
});

test('should fail validation when owner names array is missing', () => {
    org.owner = [' ', ' '];
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"owner[0]" is not allowed to be empty');
});
