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

    test('should pass validation for a valid district string', () => {
        const { error, value } = addressUtils.validateAddress(address);
        expect(error).toBeUndefined();
        expect(address).toEqual(value);
    });

    test('should fail validation when district is too short', () => {
        address.district = 'Di'; // Less than the minimum length
        const { error } = addressUtils.validateAddress(address);
        expect(error).not.toBeUndefined();
        expect(error.details[0].message).toContain("\"district\" must be one of [Agra, Aligarh, Allahabad, Ambedkar Nagar, Amethi, Amroha, Auraiya, Azamgarh, Baghpat, Bahraich, Ballia, Balrampur, Banda, Barabanki, Bareilly, Basti, Bhadohi, Bijnor, Budaun, Bulandshahr, Chandauli, Chitrakoot, Deoria, Etah, Etawah, Faizabad, Farrukhabad, Fatehpur, Firozabad, Gautam Buddha Nagar, Ghaziabad, Ghazipur, Gonda, Gorakhpur, Hamirpur, Hapur, Hardoi, Hathras, Jalaun, Jaunpur, Jhansi, Kannauj, Kanpur Dehat, Kanpur Nagar, Kasganj, Kaushambi, Kushinagar, Lakhimpur Kheri, Lalitpur, Lucknow, Maharajganj, Mahoba, Mainpuri, Mathura, Mau, Meerut, Mirzapur, Moradabad, Muzaffarnagar, Pilibhit, Pratapgarh, Rae Bareli, Rampur, Saharanpur, Sambhal, Sant Kabir Nagar, Shahjahanpur, Shamli, Shravasti, Siddharthnagar, Sitapur, Sonbhadra, Sultanpur, Unnao, Varanasi]");
    });

    test('should fail validation when district contains invalid characters', () => {
        address.District = 'District@123'; // Contains "@" character
        const { error } =  addressUtils.validateAddress(address);
        expect(error).not.toBeUndefined();
        expect(error.details[0].message).toContain("\"District\" is not allowed");
    });


   test('should fail validation when district is too long', () => {
       address. district = 'districtTooLong'.repeat(256); // Exceeds the maximum length
        const { error } = addressUtils.validateAddress(address);
        expect(error).not.toBeUndefined();
        expect(error.details[0].message).toContain("\"district\" must be one of [Agra, Aligarh, Allahabad, Ambedkar Nagar, Amethi, Amroha, Auraiya, Azamgarh, Baghpat, Bahraich, Ballia, Balrampur, Banda, Barabanki, Bareilly, Basti, Bhadohi, Bijnor, Budaun, Bulandshahr, Chandauli, Chitrakoot, Deoria, Etah, Etawah, Faizabad, Farrukhabad, Fatehpur, Firozabad, Gautam Buddha Nagar, Ghaziabad, Ghazipur, Gonda, Gorakhpur, Hamirpur, Hapur, Hardoi, Hathras, Jalaun, Jaunpur, Jhansi, Kannauj, Kanpur Dehat, Kanpur Nagar, Kasganj, Kaushambi, Kushinagar, Lakhimpur Kheri, Lalitpur, Lucknow, Maharajganj, Mahoba, Mainpuri, Mathura, Mau, Meerut, Mirzapur, Moradabad, Muzaffarnagar, Pilibhit, Pratapgarh, Rae Bareli, Rampur, Saharanpur, Sambhal, Sant Kabir Nagar, Shahjahanpur, Shamli, Shravasti, Siddharthnagar, Sitapur, Sonbhadra, Sultanpur, Unnao, Varanasi]");
    });

    test('should fail validation when district field is missing', () => {
     delete address.district
        const { error } = addressUtils.validateAddress(address);
        expect(error).not.toBeNull();
        expect(error.details[0].message).toContain('"district" is required');
    });

test('should pass validation when state contains spaces', () => {
    address.district = 'Sample district Name';
    const { error} = addressUtils.validateAddress(address);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain("\"district\" must be one of [Agra, Aligarh, Allahabad, Ambedkar Nagar," +
        " Amethi, Amroha, Auraiya, Azamgarh, Baghpat, Bahraich, Ballia, Balrampur, Banda, Barabanki, Bareilly, Basti, Bhadohi," +
        " Bijnor, Budaun, Bulandshahr, Chandauli, Chitrakoot, Deoria, Etah, Etawah, Faizabad, Farrukhabad, Fatehpur, Firozabad," +
        " Gautam Buddha Nagar, Ghaziabad, Ghazipur, Gonda, Gorakhpur, Hamirpur, Hapur, Hardoi, Hathras, Jalaun, Jaunpur, " +
        "Jhansi, Kannauj, Kanpur Dehat, Kanpur Nagar, Kasganj, Kaushambi, Kushinagar, Lakhimpur Kheri, Lalitpur, Lucknow, " +
        "Maharajganj, Mahoba, Mainpuri, Mathura, Mau, Meerut, Mirzapur, Moradabad, Muzaffarnagar, Pilibhit, Pratapgarh, " +
        "Rae Bareli, Rampur, Saharanpur, Sambhal, Sant Kabir Nagar, Shahjahanpur," +
        " Shamli, Shravasti, Siddharthnagar, Sitapur, Sonbhadra, Sultanpur, Unnao, Varanasi]")
    });



