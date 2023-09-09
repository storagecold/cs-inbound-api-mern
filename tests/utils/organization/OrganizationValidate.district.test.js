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


test('should pass validation for a valid district name', () => {
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeUndefined();
    expect(value).toEqual(org);
});

test('should fail validation for a district name less than 3 characters', () => {
    org.district = 'Fe';
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"district" length must be at least 3 ');
});

test('should fail validation for a district name exceeding 15 characters', () => {
    const district = 'ThisIsALongDistrictName',
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"district" length must be less than or equal to 15');
});


test('should fail validation for a district name containing special characters', () => {
        const district: 'District@123',
        const { error } = organizationUtils.OrganizationValidate(org);
        expect(error).not.toBeUndefined();
        expect(error.details[0].message).toContain('Invalid district name format');
    });

it('should fail validation when district field is missing', () => {
    const missingDistrict = {};
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"district" is required');
});