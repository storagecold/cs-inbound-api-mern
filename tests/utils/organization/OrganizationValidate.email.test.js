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

test('should  be pass  for valid email', () => {
    const { error, value } = organizationUtils.OrganizationValidate(org);
    expect(error).toBeUndefined();
    expect(value).toEqual(org);
});

test("Validation Error for Invalid Email", async () => {
    org.email = "lodhirajputcorporationgmail.com";
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeDefined();
    expect(error.message).toBe('"email" must be a valid email');
});

test("Validation Error for Missing Email", async () => {
    delete org.email;
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeDefined();
    expect(error.message).toBe('"email" is required');
});

test
