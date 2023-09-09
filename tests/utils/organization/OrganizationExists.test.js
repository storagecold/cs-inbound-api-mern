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

test("test to check  is org exists", async () => {
    const address = {
        city: "Firozabad",
    };
    const value = {
        name: "Lodhi Rajput Corporation",
        email: "lodhirajputcorporation@gmail.com",
        address: address,
    };

    jest.spyOn(OrganizationObj, "findOne").mockReturnValue(org);
    const orgResp = await organizationUtils.OrganizationExists(value);
    expect(orgResp).toStrictEqual(org);
});

test("Test for valid organization data", async () => {
    // Arrange
    // Act
    const {error, value} = organizationUtils.OrganizationValidate(org);
    // Assert
    expect(error).toBeUndefined();
    expect(value).toStrictEqual(org);
});
