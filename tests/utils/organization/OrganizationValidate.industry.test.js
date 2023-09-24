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


test('should pass validation for a valid industry name', () => {
    const {error, value} = organizationUtils.organizationValidate(org);
    expect(error).toBeUndefined();
    expect(value).toEqual(org);
});



test('should fail validation for an industry name less than 3 characters', () => {
    org.industry = 'Te';
    const {error} = organizationUtils.organizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"industry" length must be at least 3');
});

test('should fail validation for an industry name exceeding 15 characters', () => {
    org.industry = 'ThisIsAReallyLongIndustryName';
    const {error} = organizationUtils.organizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"industry" length must be less than or equal to 15');
});

test('should fail validation for an industry name containing special characters', () => {
    org.industry = 'Agriculture$';
    const {error} = organizationUtils.organizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"industry" with value "Agriculture$" fails to match the required pattern');
});

test('should fail validation for an empty industry name', () => {
    org.industry = '';
    const {error} = organizationUtils.organizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"industry" is not allowed to be empty');
});

test('should fail validation when industry is missing', () => {
    delete org.industry;
    const {error} = organizationUtils.organizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"industry" is required');
});

