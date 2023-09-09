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

test("Validation Error for Invalid Email", async () => {
    // Arrange
    org.email = "lodhirajputcorporationgmail.com";

    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);

    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('"email" must be a valid email');
});

test("Validation Error for Missing Email", async () => {
    // Arrange
    delete org.email;

    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);

    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe('"email" is required');
});
