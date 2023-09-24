const amadUtils = require("../../../app/utils/amadUtils");
let amad = {};

beforeEach(() => {
    amad = {
        "account": "6500812e657755c2c69a2f10",
        "company": "64fc89927e46023db4724801",
        "packet": 200,
        "kism": "LOKAR",
        "roomNo": 1,
        "grading": "GULLA",
        "createdBy": "64fc83003a0d93014c2c93c4"
    }
});

test('Valid account', () => {
    amad.account;
    const {error, value} = amadUtils.validateAmad(amad);
    expect(error).toBeUndefined();
    expect(value.account).toEqual(amad.account);
});

test('Empty account', () => {
    amad.account = '';
    const {error} = amadUtils.validateAmad(amad);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('\"account\" is not allowed to be empty');
});

test('Non-string value as the type', () => {
    amad.account = null;
    const {error} = amadUtils.validateAmad(amad);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('\"account\" must be a string');
});


