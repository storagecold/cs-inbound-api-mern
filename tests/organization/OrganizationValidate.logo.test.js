const organizationUtils = require("../../../app/utils/OrganizationUtils");

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
            village: "Shikohabad",
            district: "Firocabad",
            tehsil: "Shikohabad",
            state: "Uttar Pradesh",
            pinCode: 205145,
        },
        logo: {
            originalName: "logo.png",
            location: "https://www.abccorp.com/logo.png",
            key: "logo_123",
        },
        owner: ["Rajendra Prasad", "Ram Gopal", "Mohan Dutt"],
    }
});

test('should pass validation for a valid logo object', () => {
    const {error, value} = organizationUtils.OrganizationValidate(org);
    expect(error).toBeUndefined();
    expect(value.logo).toEqual(org.logo);
});


