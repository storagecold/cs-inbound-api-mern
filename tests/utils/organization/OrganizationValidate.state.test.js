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
            cityVillage: "Shikohabad", district: "Firocabad", state: "Uttar Pradesh", pinCode: 205145,
        },
        logo: {
            originalName: "logo.png", location: "https://www.abccorp.com/logo.png", key: "logo_123",
        },
        owner: ["Rajendra Prasad", "Ram Gopal", "Mohan Dutt"],
    };
});
test('should pass validation for a valid INDIA state abbreviation', () => {
    const validState = {
        state: 'CA',
    };
    const { error, value } = organizationUtils.OrganizationValidate(org);
    expect(error).toBeUndefined();
    expect(value.state).toEqual('org');
});

test('should fail validation for an invalid state abbreviation', () => {
    const invalidState = {
        state: 'XX', // Invalid state code
    };
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"state" must be one of [AL, AK, ...]');
});

test('should fail validation when state field is missing', () => {
    const missingState = {};
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"state" is required');
});

