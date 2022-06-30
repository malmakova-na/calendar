import {nDays, months} from "./data";


export const  getMonthsDays = (year) => {
    if(((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
        return nDays["leap"];
    } else {
        return nDays["notLeap"];
    }
};
export const getMonthDur = (month, year) => {
    const monthDays = getMonthsDays(year);
    return monthDays[month - 1]; 
};
export const getMonth = (number) => {
    if(number <= 0 || number >= 13) {
        return "Error: Invalid month";
    } else {
        return months[number-1];
    }
}

export const getWeekDay = (day, month, year) => {
    const date = new Date(year, month-1, day);
    if(date.getDay() === 0) {
        return 6;
    }
    return date.getDay()-1;
}


export const getWeek = (dayS, month, year) => {
    let week = [];
    let startWeek = "";
    let endWeek = "";
    const day = Number.parseInt(dayS, 10);
    const wIndex =  Number.parseInt(getWeekDay(day, month, year), 10);
    if(wIndex > 0 && wIndex < 7) {
        startWeek = (day - wIndex);
        endWeek = day + 6 - wIndex;
    } else if(wIndex === 0) {
        startWeek = day;
        endWeek = day + 6;
    } else if(wIndex === 6) {
        startWeek = day;
        endWeek = day - 6;
    }
    
    const dur =  getMonthDur(month, year);
    
    for(let i = startWeek; i <= endWeek; i++) {
        if(i <= 0 || i > dur) {
            week.push("");
        } else {
            week.push(i);
        }
    }
    return week;
}

const getTime = () => {
    let time = [];
    for(let i = 0; i <= 23; i++) {
        if(i < 10) {
            time.push("0" + i + ":"+ "00");
        } else {
            time.push(i + ":"+ "00");
        }
    }
    return time;
}
export const time = getTime();

export const getToday = () => {
    const  today = new Date();
    return today.toISOString().split('T')[0];
};