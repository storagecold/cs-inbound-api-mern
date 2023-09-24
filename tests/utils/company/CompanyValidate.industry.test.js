const companyObj = require("../../../app/models/Company");
const companyUtils = require("../../../app/utils/CompanyUtils");
const {before} = require("lodash");
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
            "pinCode": 205145,
        },
        "logo": {
            "url": "https://www.example.com/logo.png",
            "altText": "Company Logo"
        },
        "createdBy": "64fc83003a0d93014c2c93c4"
    }
});


test('should pass validation for a valid industry name', () => {
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeUndefined();
    expect(value).toStrictEqual(company);
});


test('should fail validation for an industry name less than 3 characters', () => {
    company.industry = 'Te';
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"industry" length must be at least 3');
});

test('should fail validation for an industry name exceeding 15 characters', () => {
    company.industry = 'ThisIsAReallyLongIndustryName';
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"industry" length must be less than or equal to 15');
});

test('should fail validation for an industry name containing special characters', () => {
    company.industry = 'Agriculture$';
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"industry" with value "Agriculture$" fails to match the required pattern');
});

test('should fail validation for an empty industry name', () => {
    company.industry = '';
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"industry" is not allowed to be empty');
});

test('should fail validation when industry is missing', () => {
    delete company.industry;
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"industry" is required');
});





