const companyObj = require("../../../app/models/Company");
const companyUtils = require("../../../app/utils/CompanyUtils");
let company = {};

beforeEach(() => {
    company = {
        "organization": "64fc83e63a0d93014c2c93df",
        "name": "Lodhi Rajput Ice and cold storage pvt ltd",
        "chamberNo": [1, 2, 3],
        "companyCode": "LRCOLD1234",
        "email": "company@example.com",
        "phone": "0567636112",
        "mobile": "8006426254",
        "industry": "Technology",
        "website": "https://www.example.com",
        "address": {
            "addressLine1": "Lodhi Rajput",
            "addressLine2": "Etah Road",
            "village": "Dakhinara",
            "tehsil": "Shikohabad",
            "district": "Firozabad",
            "state": "Uttar Pradesh",
            "pinCode": 205141
        },
        "logo": {
            "url": "https://www.example.com/logo.png",
            "altText": "Company Logo"
        },
        "createdBy": "64fc83003a0d93014c2c93c4"
    }
});

test('should pass validation for a valid company code', () => {
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeUndefined();
    expect(value).toEqual(company);
});

test('should fail validation when companyCode is missing', () => {
     delete company.companyCode ;
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"companyCode" is required');
});

test('should fail validation when companyCode has special characters', () => {
    company.companyCode = "abc12345@@"
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"companyCode\" must only contain alpha-numeric characters");
});

test('should fail validation when companyCode is too short', () => {
    company.companyCode = "a1@"
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"companyCode\" must only contain alpha-numeric characters");
});




