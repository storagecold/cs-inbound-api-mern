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

test("Validation Error for invalid mobile having numeric value.", async () => {
    account.mobile = 12345678900;
    const {error, value} = accountUtils.accountValidate(account);
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" must be a string');
});

test("Validation Error for invalid mobile having digits more than 10.", async () => {
    account.mobile = "01234567891";
    const {error, value} = accountUtils.accountValidate(account);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"mobile" with value "01234567891" fails to match the required pattern: /^[0-9]{10}$/');
});

test("Validation Error for invalid mobile having characters.", async () => {
    account.mobile = "0123456sgp";
    const {error, value} = accountUtils.accountValidate(account);
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" with value "0123456sgp" fails to match the required pattern: /^[0-9]{10}$/');
});

test("Validation Error for invalid mobile having 9 digit.", async () => {
    account.mobile = "012345678";
    const {error, value} = accountUtils.accountValidate(account);
    expect(error).toBeDefined();
    expect(error.message).toBe('"mobile" with value "012345678" fails to match the required pattern: /^[0-9]{10}$/');
});


test('should fail validation when mobile field is missing', () => {
    delete account.mobile;
    const {error} = accountUtils.accountValidate(account);
    expect(error).not.toBeNull();
    expect(error.details[0].message).toContain('"mobile" is required');
});







