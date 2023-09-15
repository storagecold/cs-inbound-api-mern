const addressUtils = require("../../../app/utils/AddressUtils");
const addressObj = require("../../../app/models/Address");
const {before} = require("lodash");
let org = {};

beforeEach(() => {
    address = {
        "village": "Dhatri",
        "tehsil": "Shikohabad",
        "district": "Etah",
        "state": "Uttar Pradesh",
        "createdBy": "64eb476859e0e17cda46401e"
    };
});

const Joi = require('joi');

    test('should pass validation for a valid state string', () => {
        const { error, value } = addressUtils.validateAddress(address);
        expect(error).toBeUndefined();
        expect(address).toEqual(value);
    });

    test('should fail validation when state is too short', () => {
        address.state = 'Di'; // Less than the minimum length
        const { error } = addressUtils.validateAddress(address);
        expect(error).not.toBeUndefined();
        expect(error.details[0].message).toContain( "\"state\" must be one of [Andaman and Nicobar Islands, Andhra Pradesh, " +
            "Arunachal Pradesh," +
            " Assam, Bihar, Chandigarh, Chhattisgarh, Dadra and Nagar Haveli, Daman and Diu, Delhi, Goa, Gujarat," +
            " Haryana, Himachal Pradesh, Jharkhand, Karnataka, Kerala, Ladakh, Lakshadweep, Madhya Pradesh, " +
            "Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland, Odisha, Puducherry, Punjab, Rajasthan, " +
            "Sikkim, Tamil Nadu, Telangana, Tripura, Uttar Pradesh, Uttarakhand, West Bengal]");
    });

    test('should fail validation when state contains invalid characters', () => {
        address.state = 'District@123'; // Contains "@" character
        const { error } =  addressUtils.validateAddress(address);
        expect(error).not.toBeUndefined();
        expect(error.details[0].message).toContain("\"state\" must be one of [Andaman and Nicobar Islands, Andhra Pradesh, Arunachal Pradesh," +
            " Assam, Bihar, Chandigarh, Chhattisgarh, Dadra and Nagar Haveli, Daman and Diu, Delhi, Goa, Gujarat, Haryana, Himachal Pradesh," +
            " Jharkhand, Karnataka, Kerala, Ladakh, Lakshadweep, Madhya Pradesh, Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland, " +
            "Odisha, Puducherry, Punjab," +
            " Rajasthan, Sikkim, Tamil Nadu, Telangana, Tripura, Uttar Pradesh, Uttarakhand, West Bengal]");
    });


   test('should fail validation when state is too long', () => {
       address.state = 'stateTooLong'.repeat(256);
        const { error } = addressUtils.validateAddress(address);
        expect(error).not.toBeUndefined();
        expect(error.details[0].message).toContain("\"state\" must be one of [Andaman and Nicobar Islands, Andhra Pradesh, " +
            "Arunachal Pradesh, Assam, Bihar, Chandigarh, Chhattisgarh, Dadra and Nagar Haveli, " +
            "Daman and Diu, Delhi, Goa, Gujarat, Haryana, Himachal Pradesh, Jharkhand, Karnataka, Kerala, Ladakh," +
            " Lakshadweep, Madhya Pradesh, Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland, Odisha," +
            " Puducherry, Punjab, Rajasthan, Sikkim," +
            " Tamil Nadu, Telangana, Tripura, Uttar Pradesh, Uttarakhand, West Bengal]");
   });

    test('should fail validation when state field is missing', () => {
     delete address.state
        const { error } = addressUtils.validateAddress(address);
        expect(error).not.toBeUndefined();
        expect(error.details[0].message).toContain('"state" is required');
    });

    test('should pass validation when state contains spaces', () => {
        address.state = 'Sample state Name';
        const { error} = addressUtils.validateAddress(address);
        expect(error).not.toBeUndefined();
        expect(error.details[0].message).toContain("\"state\" must be one of [Andaman and Nicobar Islands, Andhra Pradesh," +
            " Arunachal Pradesh, Assam, Bihar, Chandigarh, Chhattisgarh, Dadra and Nagar Haveli, Daman and Diu, Delhi, Goa, Gujarat," +
            " Haryana, Himachal Pradesh, Jharkhand, Karnataka, Kerala, Ladakh, Lakshadweep, Madhya Pradesh, Maharashtra, Manipur, " +
            "Meghalaya, Mizoram, Nagaland, Odisha, Puducherry, Punjab, Rajasthan," +
            " Sikkim, Tamil Nadu, Telangana, Tripura, Uttar Pradesh, Uttarakhand, West Bengal]");
    });



