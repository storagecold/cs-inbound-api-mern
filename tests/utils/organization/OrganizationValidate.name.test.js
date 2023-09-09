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

test("Validation Error for Missing Name", async () => {
    // Arrange
    delete org.name;
    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);
    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('"name" is required');
});

test("Validation Error for invalid Name", async () => {
    // Arrange
    org.name = "qw ";
    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);
    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('"name" length must be at least 3 characters long');
});

test("Validation Error for invalid Name , having 51 chars", async () => {
    // Arrange
    org.name = "asdfghjklpoutrewqasdfghjklpoiuyyryeewwwwqwwwwwwwwwd";

    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);
    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('"name" length must be less than or equal to 50 characters long');
});

test("Validation Error for invalid Name , having numbers", async () => {
    // Arrange
    org.name = "Ram Babu1";

    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);
    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('"name" with value "Ram Babu1" fails to match the required pattern: /^[a-zA-Z\\s]+$/');
});

test("Validation Error for invalid Name , having special character", async () => {
    // Arrange
    org.name = "Ram Babu#";

    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);
    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('"name" with value "Ram Babu#" fails to match the required pattern: /^[a-zA-Z\\s]+$/');
});
