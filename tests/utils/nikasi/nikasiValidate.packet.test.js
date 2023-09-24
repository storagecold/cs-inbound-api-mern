const nikasiUtils = require("../../../app/utils/nikasiUtils");
const amadUtils = require("../../../app/utils/AmadUtils");
let nikasi = {};

beforeEach(() => {
    nikasi = {
        "account": "64fe025b087ebb5d8dfe0337",
        "company": "64fe021a087ebb5d8dfe0324",
        "amad": "64eb4f22d87af1e7698d1af1",
        "amadNo": 105,
        "kism": "LOKAR",
        "roomNo": 1,
        "grading": "GULLA",
        "createdBy": "64fc83003a0d93014c2c93c4",
        "packet": 50
    }
});

test('Valid packet', () => {
    const {error, value} = nikasiUtils.validateNikasi(nikasi)
    expect(error).toBeUndefined();
    expect(value.packet).toEqual(nikasi.packet);
});
test('Empty packet', () => {
    nikasi.packet = '';
    const {error} = nikasiUtils.validateNikasi(nikasi)
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('\"packet\" must be a number');
});

