const companyObj = require("../../../app/models/Company");
const companyUtils = require("../../../app/utils/CompanyUtils");
const organizationUtils = require("../../../app/utils/OrganizationUtils");
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


test("Validation Error for Missing company Name", async () => {
    delete company.name;
    const {error} = companyUtils.comapnyValidate(company);
    expect(error.message).toBe('"name" is required');
});

test("Validation Error for Invalid Phone", async () => {
    company.phone = "(02299)12875678";
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toBe("\"phone\" with value \"(02299)12875678\" fails to match the required pattern: /^[0-9]+$/");
});

test("Validation Error for Invalid Phone number, having character", async () => {
    company.phone = "(02299) #12875678";
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toBe('\"phone\" with value \"(02299) #12875678\" fails to match the required pattern: /^[0-9]+$/');
});

test("Validation Error for Invalid Phone number, having numeric value", async () => {
    company.phone = 123456;
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toBe('"phone" must be a string');
});





