const organizationUtils = require("../../app/utils/OrganizationUtils");
const OrganizationObj = require("../../app/models/Organization");

test("when_pass_valid_query_return_valid_response", async () => {
  const org = {
    address: {
      city: "Shikohabad",
      district: "Firocabad",
      state: "UP",
      pinCode: "205145",
    },
    _id: "64ee1daad43d3751182c7e53",
    name: "Lodhi Rajput Corporation",
    email: "lodhirajputcorporation@gmail.com",
    phone: "05676-236112",
    mobile: "+91-8006426254",
    industry: "ColdStaorage",
    website: "https://www.abccorp.com",
    logo: {
      originalName: "logo.png",
      location: "https://www.abccorp.com/logo.png",
      key: "logo_123",
    },
    owner: ["Rajendra Prasad", "Ram Gopal", "Mohan Dutt"],
    isDeleted: false,
    deletedAt: null,
    createdAt: "2023-08-29T16:32:42.245Z",
    updatedAt: "2023-08-29T16:32:42.245Z",
    __v: 0,
  };
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

test("when_missing_name_should_throw_missing_email_error", async () => {
  const missingName = {
    email: "lodhirajputcorporation@gmail.com",
    phone: "05676-123486",
    mobile: "+91-8006426768",
    industry: "ColdS$#@@829",
    website: "https://www.abccorp1.com",
    address: {
      city: "Firozabad",
      district: "Shikohabad",
      state: " Uttar Pradesh",
      pinCode: "283203",
    },
    logo: {
      originalName: "logo.png",
      location: "https://www.abccorp.com/logo.png",
      key: "logo_123",
    },
    owner: ["Rani Prasad", "Ram Gopal", "Mohan Dutt"],
  };
  const { error, value } = organizationUtils.OrganizationValidate(missingName);
  expect(error.message).toBe('"name" is required');
});

test("when_missing_name_should_throw_missing_email_error", async () => {
  const invalidEmail = {
    name: "Lodhi Rajput Corporation",
    email: "lodhirajputcorporation_gmail.com",
    phone: "05676-123486",
    mobile: "+91-8006426768",
    industry: "ColdS$#@@829",
    website: "https://www.abccorp1.com",
    address: {
      city: "Firozabad",
      district: "Shikohabad",
      state: " Uttar Pradesh",
      pinCode: "283203",
    },
    logo: {
      originalName: "logo.png",
      location: "https://www.abccorp.com/logo.png",
      key: "logo_123",
    },
    owner: ["Rani Prasad", "Ram Gopal", "Mohan Dutt"],
  };
  const { error, value } = organizationUtils.OrganizationValidate(invalidEmail);
  expect(error.message).toBe('"email" must be a valid email');
});

test("when_missing_email_should_throw_missing_email_error", async () => {
  const missingEmail = {
    name: "Lodhi Rajput Corporation",
    phone: "05676-123486",
    mobile: "+91-8006426768",
    industry: "ColdS$#@@829",
    website: "https://www.abccorp1.com",
    address: {
      city: "Firozabad",
      district: "Shikohabad",
      state: " Uttar Pradesh",
      pinCode: "283203",
    },
    logo: {
      originalName: "logo.png",
      location: "https://www.abccorp.com/logo.png",
      key: "logo_123",
    },
    owner: ["Rani Prasad", "Ram Gopal", "Mohan Dutt"],
  };
  const { error, value } = organizationUtils.OrganizationValidate(missingEmail);
  expect(error.message).toBe('"email" is required');
});

test("when_missing_email_should_throw_missing_email_error", async () => {
  const missingEmail = {
    name: "Lodhi Rajput Corporation",
    phone: "05676-123486",
    mobile: "+91-8006426768",
    industry: "ColdS$#@@829",
    website: "https://www.abccorp1.com",
    address: {
      city: "Firozabad",
      district: "Shikohabad",
      state: " Uttar Pradesh",
      pinCode: "283203",
    },
    logo: {
      originalName: "logo.png",
      location: "https://www.abccorp.com/logo.png",
      key: "logo_123",
    },
    owner: ["Rani Prasad", "Ram Gopal", "Mohan Dutt"],
  };
  const { error, resp } = organizationUtils.OrganizationValidate(missingEmail);
  expect(error.message).toBe('"email" is required');
});

test("when_missing_phone_should_throw_missing_phone_error", async () => {
  const missingPhone = {
    name: "Lodhi Rajput Corporation",
    email: "lodhirajputcorporation@gmail.com",
    phone: 9876543278,
    mobile: "+91-8006426768",
    industry: "ColdS$#@@829",
    website: "https://www.abccorp1.com",
    address: {
      city: "Firozabad",
      district: "Shikohabad",
      state: " Uttar Pradesh",
      pinCode: "283203",
    },
    logo: {
      originalName: "logo.png",
      location: "https://www.abccorp.com/logo.png",
      key: "logo_123",
    },
    owner: ["Rani Prasad", "Ram Gopal", "Mohan Dutt"],
  };
  const { error, value } = organizationUtils.OrganizationValidate(missingPhone);
  expect(error.message).toBe('"phone" must be less than or equal to 12');
});
