const companyObj = require("../../../app/models/Company");
const companyUtils = require("../../../app/utils/CompanyUtils");
let company = {};

function m1() {
    company = {
        "organization": "64fc83e63a0d93014c2c93df",
        "name": "Lodhi Rajput Ice and cold storage pvt ltd",
        "chamberNo":[1,2,3],
        "companyCode": "LRCOLD1234",
        "email": "company@example.com",
        "phone": "0567636112",
        "mobile": "8006426254",
        "industry": "Technology",
        "website": "https://www.example.com",
        "address": {
            "addressLine1":"Lodhi Rajput",
            "addressLine2":"Etah Road",
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

test("Validation Error for invalid Name", async () => {
    company.name = "qw ";
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toBe('"name" length must be at least 3 characters long');
});

test("Validation Error for invalid Name , having 51 chars", async () => {
    company.name = "asdfghjklpoutrewqasdfghjklpoiuyyryeewwwwqwwwwwwwwwd";
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toContain('"name" length must be less than or equal to 50 characters long');
});

test("Validation Error for invalid Name , having numbers", async () => {
    company.name = "Ram Babu1";
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toContain('"name" with value "Ram Babu1" fails to match the required pattern: /^[a-zA-Z\\s]+$/');
});

test("Validation Error for invalid Name , having special character", async () => {
    company.name = "Ram Babu#";
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toBe('"name" with value "Ram Babu#" fails to match the required pattern: /^[a-zA-Z\\s]+$/');
});





