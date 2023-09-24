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

test('should  be pass  for valid email', () => {
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeUndefined();
    expect(value).toEqual(company);
});


test("Validation Error for Invalid Email", async () => {
    company.email = "lodhirajputcorporationgmail.com";
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toBe('"email" must be a valid email');
});

test("Validation Error for Missing Email", async () => {
    delete company.email;
    const {error, value} = companyUtils.comapnyValidate(company);
    expect(error).toBeDefined();
    expect(error.message).toBe('"email" is required');
});





