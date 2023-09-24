const accountUtils = require('../../app/utils/AccountUtils');

beforeEach(() => {
    // Mock any necessary dependencies or setup required for testing
});

afterEach(() => {
    // Clean up any mocks or reset necessary dependencies
});


// Add more test cases to cover different scenarios and branches of the code


test('should return error if account validation fails', async () => {
    const req = {body: {}};
    const res = {
        jsonp: jest.fn().mockImplementation((response) => response)
    };

    const error = new Error('Validation error');
    accountUtils.accountValidate.mockReturnValueOnce({error});

    await createAccount(req, res);

    expect(res.jsonp).toHaveBeenCalledWith({
        status: 'error',
        messageId: 400,
        message: 'Validation error'
    });
});

test('should return error if company does not exist', async () => {
    const req = {body: {company: 'companyId'}};
    const res = {
        json: jest.fn().mockImplementation((response) => response)
    };

    accountUtils.accountValidate.mockReturnValueOnce({value: req.body});
    companyUtils.companyExists.mockResolvedValueOnce(false);

    await createAccount(req, res);

    expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        messageId: 400,
        message: 'Company not found'
    });
});

