const companyObj = require("../../../app/models/Company");
const companyUtils = require("../../../app/utils/CompanyUtils");
let company = {};

function m1() {
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
    };
}

beforeEach(m1);

test('should pass validation for a valid website URL', () => {
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(value.website).toBe('https://www.example.com');
});

test('should fail validation for an invalid website URL', () => {
    company.website = 'invalid-website';
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('website" must be a valid uri with a scheme matching the http|https pattern');
});

test('should fail validation when website is too long', () => {
    company.website = 'https://' + 'a'.repeat(256); // Exceeds the maximum length
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"website" must be a valid uri with a scheme matching the http|https pattern');
});

test('should fail validation when website field is missing', () => {
    delete company.website;
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"website" is required');
});

test('should fail validation when website does not start with http or https', () => {
    company.Website = 'ftp://www.example.com';
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"Website" is not allowed');
});






