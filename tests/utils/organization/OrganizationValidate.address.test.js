const organizationUtils = require("../../../app/utils/OrganizationUtils");
const OrganizationObj = require("../../../app/models/Organization");
const {before} = require("lodash");
let org = {};

beforeEach(() => {
    org = {
        name: "Lodhi Rajput Corporation",
        email: "lodhirajputcorporation@gmail.com",
        phone: "(05675) 3536112",
        mobile: "8006426254",
        industry: "Cold Storage",
        website: "https://www.abccorp.com",
        address: {
            cityVillage: "Shikohabad", district: "Firocabad", state: "Uttar Pradesh", pinCode: 205145,
        },
        logo: {
            originalName: "logo.png", location: "https://www.abccorp.com/logo.png", key: "logo_123",
        },
        owner: ["Rajendra Prasad", "Ram Gopal", "Mohan Dutt"],
    };
});


test('should pass validation for a valid city or village name', () => {
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeUndefined();
    expect(value).toEqual(org);
});


test('should pass validation when cityVillage field is empty', () => {
    const emptyCityVillage = {
        cityVillage: '',
    };
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(value.details[0].message).toContain('cityVillage');
});

test('should fail validation for a city or village name exceeding the maximum length', () => {
    const longCityVillage = {
        cityVillage: 'ThisIsAReallyLongCityVillageName',
    };
    const {error} = organizationUtils.OrganizationValidate(org);
    expect(error).not.toBeUndefined();
    expect(error.details[0].message).toContain('"cityVillage" length must be less than or equal to 255');
});

