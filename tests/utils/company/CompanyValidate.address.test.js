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

test('should pass validation for a valid city or village name', () => {
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeUndefined();
    expect(value).toEqual(company);
});

test('should pass validation for a valid address object', () => {
    company.Address = {
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 456',
    };
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("");
});

test('should pass validation when address lines are empty', () => {
    company.Address = {
        addressLine1: '',
        addressLine2: '',
    };
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain("");
});

test('should fail validation when addressLine1 is too short', () => {
    company.Address = {
        addressLine1: 'A',
        addressLine2: 'Apt 456',
    };
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("");
});

test('should fail validation when addressLine2 is too long', () => {
    company.Address = {
        addressLine1: '123 Main Street',
        addressLine2: 'Apartment 456, Building C',
    };
    const {error} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('');
});






