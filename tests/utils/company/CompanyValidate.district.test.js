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
            "pinCode": 205145
        },
        "logo": {
            "url": "https://www.example.com/logo.png",
            "altText": "Company Logo"
        },
        "createdBy": "64fc83003a0d93014c2c93c4"
    };
}

beforeEach(m1);


test('should pass validation for a valid district name', () => {
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeUndefined();
    expect(value).toEqual(company);
});

test('should fail validation for a district name less than 3 characters', () => {
    company.district = 'Fe';
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"district\" is not allowed");
});

test('should fail validation for a district name exceeding 15 characters', () => {
    company.district = 'ThisIsALongDistrictName';
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"district\" is not allowed");
});


test('should fail validation for a district name containing special characters', () => {
    company.district = 'District@123';
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"district\" is not allowed");
});

test('should fail validation when district field is missing', () => {
    delete company.address.district;
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('"address.district" is required');
});






