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

test("Validation Error for Invalid Phone", async () => {
    // Arrange
    org.phone = "(02299)12875678";

    // Act
    const {error, value} = organizationUtils.organizationValidate(org);

    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe(
        'Invalid Indian landline phone number format'
    );


});

test("Validation Error for Invalid Phone number, having character", async () => {
    // Arrange
    org.phone = "(02299) #12875678";

    // Act
    const {error, value} = organizationUtils.organizationValidate(org);

    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe(
        'Invalid Indian landline phone number format'
    );
});

test("Validation Error for Invalid Phone number, having numeric value", async () => {
    // Arrange
    org.phone = 123456;

    // Act
    const {error, value} = organizationUtils.organizationValidate(org);

    // Assert
    expect(error).toBeDefined();
    expect(error.message).toBe(
        '"phone" must be a string'
    );
});

