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

test('Valid careOf value', () => {
    account.careOf ;
    const { error,value } = accountUtils.accountValidate(account);
    expect(error).toBeUndefined();
    expect(value.careOf).toContain(account.careOf);
});

test('Non-string value as the careOf', () => {
    account.careOf = null;
    const { error } = accountUtils.accountValidate(account);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('\"careOf\" must be a string');
});

test('Omitting the careOf field', () => {
    account.careOf = {};
    const{error} = accountUtils.accountValidate(account);
        expect(error).not.toBeUndefined();
        expect(error.details[0].message).toContain('\"careOf\" must be a string');
});



