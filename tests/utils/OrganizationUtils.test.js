const organizationUtils = require("../../app/utils/OrganizationUtils");
const OrganizationObj = require("../../app/models/Organization");
const { before } = require("lodash");
let org = {};

beforeEach(() => {
  org = {
    name: "Lodhi Rajput Corporation",
    email: "lodhirajputcorporation@gmail.com",
    phone: "1234567890",
    mobile: "8006426254",
    industry: "ColdStaorage",
    website: "https://www.abccorp.com",
    address: {
      city: "Shikohabad",
      district: "Firocabad",
      state: "UP",
      pinCode: "205145",
    },
    logo: {
      originalName: "logo.png",
      location: "https://www.abccorp.com/logo.png",
      key: "logo_123",
    },
    owner: ["Rajendra Prasad", "Ram Gopal", "Mohan Dutt"],
  };
});

test("when_pass_valid_query_return_valid_response", async () => {
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

test("Validation Error for Missing Name", async () => {
  // Arrange
  delete org.name;
  // Act
  const { error, value } = organizationUtils.OrganizationValidate(org);
  // Assert
  expect(error).toBeDefined();
  expect(error.message).toBe('"name" is required');
});

test("Validation Error for invalid Name", async () => {
  // Arrange
  org.name = "qwertyuioplkjhf";
  // Act
  const { error, value } = organizationUtils.OrganizationValidate(org);
  // Assert
  expect(error).toBeDefined();
  expect(error.message).toBe('"name" is required');
});

test("Validation Error for Invalid Email", async () => {
  // Arrange
  org.email = "lodhirajputcorporationgmail.com";

  // Act
  const { error, value } = organizationUtils.OrganizationValidate(org);

  // Assert
  expect(error).toBeDefined();
  expect(error.message).toBe('"email" must be a valid email');
});

test("Validation Error for Missing Email", async () => {
  // Arrange
  delete org.email;

  // Act
  const { error, value } = organizationUtils.OrganizationValidate(org);

  // Assert
  expect(error).toBeDefined();
  expect(error.message).toBe('"email" is required');
});

test("Validation Error for Invalid Phone", async () => {
  // Arrange
  org.phone = "1234567890988";

  // Act
  const { error, value } = organizationUtils.OrganizationValidate(org);

  // Assert
  expect(error).toBeDefined();
  expect(error.message).toBe(
    '"phone" with value "1234567890988" fails to match the required pattern: /^\\d{1,12}$/'
  );
});

