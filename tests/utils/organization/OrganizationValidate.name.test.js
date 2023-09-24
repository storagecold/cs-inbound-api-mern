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

test("Validation Error for Missing Name", async () => {
    delete org.name;
    const {error, value} = organizationUtils.organizationValidate(org);
    expect(error).toBeDefined();
    expect(error.message).toBe('"name" is required');
});

test("Validation Error for invalid Name", async () => {
    org.name = "qw ";
    const {error, value} = organizationUtils.organizationValidate(org);
    expect(error).toBeDefined();
    expect(error.message).toBe('"name" length must be at least 3 characters long');
});

test("Validation Error for invalid Name , having 51 chars", async () => {
    org.name = "asdfghjklpoutrewqasdfghjklpoiuyyryeewwwwqwwwwwwwwwd";
    const {error, value} = organizationUtils.organizationValidate(org);
    expect(error).toBeDefined();
    expect(error.message).toBe('"name" length must be less than or equal to 50 characters long');
});

test("Validation Error for invalid Name , having numbers", async () => {
    org.name = "Ram Babu1";
    const {error, value} = organizationUtils.organizationValidate(org);
    expect(error).toBeDefined();
    expect(error.message).toBe('"name" with value "Ram Babu1" fails to match the required pattern: /^[a-zA-Z\\s]+$/');
});

test("Validation Error for invalid Name , having special character", async () => {
    org.name = "Ram Babu#";
    const {error, value} = organizationUtils.organizationValidate(org);
    expect(error).toBeDefined();
    expect(error.message).toBe('"name" with value "Ram Babu#" fails to match the required pattern: /^[a-zA-Z\\s]+$/');
});
