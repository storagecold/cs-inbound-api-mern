const addressUtils = require("../../../app/utils/CompanyUtils");
const addressObj = require("../../../app/models/Company");
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





