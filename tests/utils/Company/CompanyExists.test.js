const companyObj = require("../../../app/models/Company");
const companyUtils = require("../../../app/utils/CompanyUtils");
let company = {};

beforeEach(() => {
    company = {
        "_id": {
            "$oid": "64fe021a087ebb5d8dfe0324"
        },
        "companyCode": "LRCOLD",
        "organization": {
            "$oid": "64fe00e3087ebb5d8dfe0301"
        },
        "chamberNo": [
            1,
            2,
            3
        ],
        "name": "Lodhi Rajput Ice and cold storage pvt ltd",
        "email": "company@example.com",
        "phone": "0567636112",
        "mobile": "8006426254",
        "industry": "Technology",
        "website": "https://www.example.com",
        "address": {
            "addressLine1": "Lodhi Rajput",
            "addressLine2": "Etah Road",
            "village": "Sankhini",
            "tehsil": "Shikohabad",
            "district": "Firozabad",
            "state": "Uttar Pradesh",
            "pinCode":  205145,
        },
        "logo": {
            "url": "https://www.example.com/logo.png",
            "altText": "Company Logo"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdBy": {
            "$oid": "64eb476859e0e17cda46401e"
        },
        "createdAt": {
            "$date": "2023-09-10T17:51:22.777Z"
        },
        "updatedAt": {
            "$date": "2023-09-10T17:51:22.777Z"
        },
        "__v": 0
    };
});


test("test to check  is company exists", async () => {
    companyQuery = {
        "name": "Lodhi Rajput Ice and cold storage pvt ltd",
        "email": "company@example.com",
        "companyCode": "LRCOLD",
    }

    jest.spyOn(companyObj, "findOne").mockReturnValue(company);
    const compResp = await companyUtils.companyExists(companyQuery);
    expect(compResp).toStrictEqual(company);
});
