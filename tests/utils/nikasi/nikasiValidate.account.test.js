const nikasiUtils = require("../../../app/utils/nikasiUtils");
let nikasi = {};

beforeEach(() => {
    nikasi = {
        "account": "6500812e657755c2c69a2f10",
        "company": "64fc89927e46023db4724801",
        "packet": 200,
        "kism": "LOKAR",
        "roomNo": 1,
        "grading": "GULLA",
        "createdBy": "64fc83003a0d93014c2c93c4"
    }
});

test('Empty nikasi', () => {
    nikasi.account = '';
    const {error} = nikasiUtils.validateNikasi(nikasi);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('\"account\" is not allowed to be empty');
});

test('Non-string value as the type', () => {
    nikasi.account = null;
    const {error} = nikasiUtils.validateNikasi(nikasi);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('\"account\" must be a string');
});


