const Joi = require("joi");
const AddressObj = require("../models/Address");

module.exports = {
    existsAddress: async function (query) {
        const address = await AddressObj.findOne(query)
        return address;
    },
    validateAddress: async function (body) {

        const alphaSpaceRegex = /^[A-Za-z ]+$/; 

        const addressSchema = Joi.object({
            village: Joi.string().regex(alphaSpaceRegex).required(),
            tehsil: Joi.string().regex(alphaSpaceRegex).required(),
            district: Joi.string().regex(alphaSpaceRegex).required(),
            state: Joi.string().regex(alphaSpaceRegex).required(),
            createdBy: Joi.string().alphanum().length(24), 
            updatedBy: Joi.string().alphanum().length(24),
        }).options({ abortEarly: false });
        return addressSchema.validate(body);
    }
}

    const addressSchema = Joi.object({
      village: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .regex(alphaSpaceRegex)
        .required(),
      tehsil: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .regex(alphaSpaceRegex)
        .required(),
      district: Joi.string()
        .trim()
        .valid(
          "Agra",
          "Aligarh",
          "Allahabad",
          "Ambedkar Nagar",
          "Amethi",
          "Amroha",
          "Auraiya",
          "Azamgarh",
          "Baghpat",
          "Bahraich",
          "Ballia",
          "Balrampur",
          "Banda",
          "Barabanki",
          "Bareilly",
          "Basti",
          "Bhadohi",
          "Bijnor",
          "Budaun",
          "Bulandshahr",
          "Chandauli",
          "Chitrakoot",
          "Deoria",
          "Etah",
          "Etawah",
          "Faizabad",
          "Farrukhabad",
          "Fatehpur",
          "Firozabad",
          "Gautam Buddha Nagar",
          "Ghaziabad",
          "Ghazipur",
          "Gonda",
          "Gorakhpur",
          "Hamirpur",
          "Hapur",
          "Hardoi",
          "Hathras",
          "Jalaun",
          "Jaunpur",
          "Jhansi",
          "Kannauj",
          "Kanpur Dehat",
          "Kanpur Nagar",
          "Kasganj",
          "Kaushambi",
          "Kushinagar",
          "Lakhimpur Kheri",
          "Lalitpur",
          "Lucknow",
          "Maharajganj",
          "Mahoba",
          "Mainpuri",
          "Mathura",
          "Mau",
          "Meerut",
          "Mirzapur",
          "Moradabad",
          "Muzaffarnagar",
          "Pilibhit",
          "Pratapgarh",
          "Rae Bareli",
          "Rampur",
          "Saharanpur",
          "Sambhal",
          "Sant Kabir Nagar",
          "Shahjahanpur",
          "Shamli",
          "Shravasti",
          "Siddharthnagar",
          "Sitapur",
          "Sonbhadra",
          "Sultanpur",
          "Unnao",
          "Varanasi"
        )
        .required(),
      state: Joi.string()
        .trim()
        .valid(
          "Andaman and Nicobar Islands",
          "Andhra Pradesh",
          "Arunachal Pradesh",
          "Assam",
          "Bihar",
          "Chandigarh",
          "Chhattisgarh",
          "Dadra and Nagar Haveli",
          "Daman and Diu",
          "Delhi",
          "Goa",
          "Gujarat",
          "Haryana",
          "Himachal Pradesh",
          "Jharkhand",
          "Karnataka",
          "Kerala",
          "Ladakh",
          "Lakshadweep",
          "Madhya Pradesh",
          "Maharashtra",
          "Manipur",
          "Meghalaya",
          "Mizoram",
          "Nagaland",
          "Odisha",
          "Puducherry",
          "Punjab",
          "Rajasthan",
          "Sikkim",
          "Tamil Nadu",
          "Telangana",
          "Tripura",
          "Uttar Pradesh",
          "Uttarakhand",
          "West Bengal"
        )
        .required(),
      createdBy: Joi.string().trim().alphanum().length(24),
      updatedBy: Joi.string().trim().alphanum().length(24),
    }).options({ abortEarly: false });
    return addressSchema.validate(body);
  },
};
