const organizationUtils = require("../../../app/utils/OrganizationUtils");
const OrganizationObj = require("../../../app/models/Organization");
const addressUtils = require("../../../app/utils/AddressUtils");
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

test('should pass validation for a valid district name', () => {
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeUndefined();
    expect(value).toEqual(org);
});

test('should fail validation for a district name less than 3 characters', () => {
    org.district = 'Fe';
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"district\" is not allowed");
});

test('should fail validation for a district name exceeding 15 characters', () => {
    org.district = 'ThisIsALongDistrictName';
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"district\" is not allowed");
});


test('should fail validation for a district name containing special characters', () => {
    org.district = 'District@123';
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"district\" is not allowed");
});

test('should fail validation when district field is missing', () => {
    delete org.address.district;
    const { error } = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('"address.district" is required');
});


