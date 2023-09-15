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

test("Validation Error for invalid mobile having numeric value.", async () => {
    org.mobile = 12345678900;
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" must be a string');
});

test("Validation Error for invalid mobile having digits more than 10.", async () => {
    org.mobile = "01234567891";
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" with value "01234567891" fails to match the required pattern: /^[0-9]{10}$/');
});

test("Validation Error for invalid mobile having characters.", async () => {
    org.mobile = "0123456sgp";
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" with value "0123456sgp" fails to match the required pattern: /^[0-9]{10}$/');
});

test("Validation Error for invalid mobile having 9 digit.", async () => {
    org.mobile = "012345678";
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" with value "012345678" fails to match the required pattern: /^[0-9]{10}$/');
});

test("Validation Error for Missing mobile", async () => {
    delete org.mobile;
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" is required');
});

