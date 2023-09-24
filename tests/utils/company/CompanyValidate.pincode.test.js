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

test('should pass validation for a valid 6-digit pin code', () => {
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeUndefined();
    expect(value).toStrictEqual(company);
});

test('should fail validation for a non-integer value', () => {
    company.address.pinCode = "abc";
    const {error} = companyUtils.comapnyValidate(company);
    expect(error.message).toContain('"address.pinCode" must be a number');
});

test('should fail validation for a 5-digit pin code ', () => {
    company.address.pinCode = 12345;
    const {error} = companyUtils.comapnyValidate(company);
    expect(error.message).toContain('"address.pinCode" must be greater than or equal to 100000');
});

test('should fail validation for a 7-digit pin code', () => {
    company.address.PinCode = 1234567;
    const {error} = companyUtils.comapnyValidate(company);
    expect(error.message).toEqual("\"address.PinCode\" is not allowed");
});

test(" should fail Validation when  pinCode field is missing", () => {
    delete company.address.pinCode;
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error.message).toEqual('"address.pinCode" is required');
});





