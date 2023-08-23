const moment = require("moment");
const admin = require("firebase-admin");

const constantObj = require("../config/Constants");

const serviceAccount = require("./../config/firebase/fleetfixy-firebase-adminsdk-87hfo-3ea8319618.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const errorHandler = (message = constantObj.messages.ErrorRetreivingData) => {
    return {
        status: "failure",
        messageId: 203,
        message: message
    };
};

const formatDate = (date, format = 'DD-MMM-YYYY') => {
    return moment(date).format(format);
}

const addDaysToDate = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

const addMonthsToDate = (date, months) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
}

const addYearsToDate = (date, years) => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
}

const subtractDaysFromDate = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
}

const subtractMonthsFromDate = (date, months) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - months);
    return newDate;
}

const subtractYearsFromDate = (date, years) => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() - years);
    return newDate;
}

const getDateStartTime = (date) => {
    return moment(date).format('YYYY-MM-DD[T00:00:00.000Z]');
}

const getDateEndTime = (date) => {
    return moment(date).format('YYYY-MM-DD[T23:59:59.999Z]');
}

const getAllDatesInRange = (startDate, endDate, steps = 1) => {
    const dateArray = [];
    let currentDate = addDaysToDate(new Date(startDate), 1);
    let lastDate = addDaysToDate(new Date(endDate), 1);
    while (currentDate <= lastDate) {
        dateArray.push(new Date(currentDate));
        // Use UTC date to prevent problems with time zones and DST
        // currentDate.setUTCDate(currentDate.getUTCDate() + steps);
        currentDate.setDate(currentDate.getDate() + steps);
    }

    return dateArray;
}

const dateCheckExistInRange = (from, to, check) => {
    let fDate, lDate, cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if ((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
}


const secondsToHoursMinutes = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let decimalMinutes = (minutes / 60).toFixed(2);
    let totalHours = hours + decimalMinutes;

    // Format the result
    let formattedTime = hours.toString().padStart(2, '0') + 'h ' + minutes.toString().padStart(2, '0') + 'm';

    return {
        hours: totalHours,
        formattedTime: formattedTime
    };
}

const decimalHoursToFormatted = (decimalHours) => {
    let hours = Math.floor(decimalHours);
    let minutes = Math.round((decimalHours % 1) * 60);

    // Format the result
    let formattedTime = hours.toString().padStart(2, '0') + 'h ' + minutes.toString().padStart(2, '0') + 'm';

    return formattedTime;
}

module.exports = {
    errorHandler,
    formatDate,
    addDaysToDate,
    addMonthsToDate,
    addYearsToDate,
    subtractDaysFromDate,
    subtractMonthsFromDate,
    subtractYearsFromDate,
    getDateStartTime,
    getDateEndTime,
    getAllDatesInRange,
    dateCheckExistInRange,
    secondsToHoursMinutes,
    decimalHoursToFormatted
};
