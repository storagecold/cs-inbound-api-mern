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

test('should pass validation for a valid address object', () => {
    const {error, value} = accountUtils.accountValidate(account);
    expect(error).toBeUndefined();
    expect(account).toEqual(value);
});

test('should pass validation for a valid 6-digit pin code', () => {
    const {error, value} = accountUtils.accountValidate(account);
    expect(error).toBeUndefined();
    expect(value).toStrictEqual(account);
});

test('should fail validation for a non-integer value', () => {
    account.address.pinCode = "abc";
    const {error} = accountUtils.accountValidate(account);
    expect(error.message).toContain('"address.pinCode" must be a number');
});

test('should fail validation for a 5-digit pin code ', () => {
    account.address.pinCode = 12345;
    const {error} = accountUtils.accountValidate(account);
    expect(error.message).toContain('"address.pinCode" must be greater than or equal to 100000');
});

test('should fail validation for a 7-digit pin code', () => {
    account.address.PinCode = 1234567;
    const {error} = accountUtils.accountValidate(account);
    expect(error.message).toEqual("\"address.PinCode\" is not allowed");
});

test(" should fail Validation when  pinCode field is missing", () => {
    delete account.address.pinCode;
    const {error, value} = accountUtils.accountValidate(account);
    expect(error.message).toEqual('"address.pinCode" is required');
});






