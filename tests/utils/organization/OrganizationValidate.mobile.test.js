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

test("Validation Error for invalid mobile having numeric value.", async () => {
    // Arrange
    org.mobile = 12345678900;
    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);
    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" must be a string');
});

test("Validation Error for invalid mobile having digits more than 10.", async () => {
    // Arrange
    org.mobile = "01234567891";
    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);
    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" with value "01234567891" fails to match the required pattern: /^[0-9]{10}$/');
});

test("Validation Error for invalid mobile having characters.", async () => {
    // Arrange
    org.mobile = "0123456sgp";
    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);
    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" with value "0123456sgp" fails to match the required pattern: /^[0-9]{10}$/');
});

test("Validation Error for invalid mobile having 9 digit.", async () => {
    // Arrange
    org.mobile = "012345678";
    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);
    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" with value "012345678" fails to match the required pattern: /^[0-9]{10}$/');
});

test("Validation Error for Missing mobile", async () => {
    // Arrange
    delete org.mobile;
    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);
    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" is required');
});

