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
test('should pass validation for a valid INDIA state abbreviation', () => {
    const { error, value } = organizationUtils.organizationValidate(org);
    expect(error).toBeUndefined();
    expect(value).toEqual(org);
});

test('should fail validation for an invalid state abbreviation', () => {
    org.address.State = "NJ";
    const { error } = organizationUtils.organizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"address.State\" is not allowed");
});

test('should fail validation when state field is missing', () => {
     delete org.address.state;
    const { error } = organizationUtils.organizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"address.state\" is required");
});

