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

test("Validation Error for invalid mobile having numeric value.", async () => {
    company.mobile = 12345678900;
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" must be a string');
});

test("Validation Error for invalid mobile having digits more than 10.", async () => {
    company.mobile = "01234567891";
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"mobile" with value "01234567891" fails to match the required pattern: /^[0-9]{10}$/');
});

test("Validation Error for invalid mobile having characters.", async () => {
    company.mobile = "0123456sgp";
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" with value "0123456sgp" fails to match the required pattern: /^[0-9]{10}$/');
});

test("Validation Error for invalid mobile having 9 digit.", async () => {
    company.mobile = "012345678";
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" with value "012345678" fails to match the required pattern: /^[0-9]{10}$/');
});

test("Validation Error for Missing mobile", async () => {
    delete company.mobile;
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" is required');
});

