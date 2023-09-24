const accountUtils = require("../../../app/utils/AccountUtils");
let account = {};

beforeEach(() => {
    account = {
        "company": "64fc89927e46023db4724801",
        "type": "kisan",
        "firstName": "Rajpal",
        "lastName": "Singh",
        "careOf": "S/O",
        "careOfName": "Than Singh",
        "address": {
            "village": "Mavasi",
            "tehsil": "Shikohabad",
            "district": "Firozabad",
            "state": "Uttar Pradesh",
            "pinCode": 123456
        },
        "bankDetails": [
            {
                "bankAccountNumber": "123456789",
                "bankAccountName": "John Doe",
                "bankName": "Example Bank",
                "branchName": "Example Branch",
                "ifscCode": "SBIN0000716"
            },
            {
                "bankAccountNumber": "9876543210",
                "bankAccountName": "Jane Smith",
                "bankName": "Another Bank",
                "branchName": "Another Branch",
                "ifscCode": "SBIN0000716"
            }
        ],
        "mobile": "8006426254",
        "adharNo": "1234 5678 9012",
        "panNo": "ABCDE1234F",
        "email": "john.doe@example.com",
        "createdBy": "64fc83003a0d93014c2c93c4"
    }
});

test('Valid Indian Aadhaar number', () => {
    const {error, value} = accountUtils.accountValidate(account);
    expect(error).toBeUndefined();
    expect(account).toEqual(value);
});

test('Empty Aadhaar number', () => {
    account.adharNo = '';
    const {error, value} = accountUtils.accountValidate(account);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"adharNo\" is not allowed to be empty");
});

test('Aadhaar number with fewer than three groups of four digits', () => {
    account.adharNo = '1234';
    const {error, value} = accountUtils.accountValidate(account);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('\"adharNo\" with value \"1234\" fails to match the required pattern: /^\\d{4}\\s\\d{4}\\s\\d{4}$/');
});

test('should fail validation when adharNo field is missing', () => {
    delete account.adharNo;
    const {error} = accountUtils.accountValidate(account);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('"adharNo" is required');
});





