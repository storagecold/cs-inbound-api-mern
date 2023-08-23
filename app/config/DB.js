const mongoose = require("mongoose");
const chalk = require("chalk");

const UserObj = require("../models/userAuth/User");
const constantObj = require("./Constants");

const DBURL = process.env.DATABASE;

mongoose.set('strictQuery', false);
mongoose.connect(DBURL).then(
    () => { /** ready to use*/ 
        console.log('%s MongoDB Connected Successfully.', chalk.green('✓'));
        // Creating admin for one time
        UserObj.findOne({ role: 'admin' }).lean().exec(function(err, data) {
            if (!data) {
                let admin = constantObj.adminJson;
                let user = new UserObj(admin);
                user.save();
                console.log("Admin has been created successfully with default email and password")
            }
        });
    },
    err => { 
        console.error(err);
        console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    }
);
  