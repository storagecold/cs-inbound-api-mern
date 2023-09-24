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
            "pinCode":  205145,
        },
        "logo": {
            "url": "https://www.example.com/logo.png",
            "altText": "Company Logo"
        },
        "createdBy": "64fc83003a0d93014c2c93c4"
    };
}

beforeEach(m1);

test('should pass validation for a valid INDIA state abbreviation', () => {
    const { error, value } = companyUtils.comapnyValidate(company);
    expect(error).toBeUndefined();
    expect(value).toEqual(company);
});

test('should fail validation for an invalid state abbreviation', () => {
    company.address.State = "NJ";
    const { error } = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"address.State\" is not allowed");
});

test('should fail validation when state field is missing', () => {
    delete company.address.state;
    const { error } = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"address.state\" is required");
});





