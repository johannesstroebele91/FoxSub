import {DateFormatted} from "../models/DateFormatted";

export class DateFormatter {

    static formatDateToDB(date: string) {
        return [Number(date.substring(4, 6)), Number(date.substring(7, 9))];
    }

    static formatDateFromDB(dateFormatted: DateFormatted) {
        let currYear: number = new Date().getFullYear();
        let currMonth: number  = new Date().getMonth() + 1;
        let currDay: number  = new Date().getDate();
        let year: number;

        if(dateFormatted.month < currMonth){
            year = currYear + 1;
        }else if(dateFormatted.month == currMonth && dateFormatted.day < currDay){
            year = currYear + 1;
        }else{
            year = currYear;
        }

        let date: string = year + "-" + dateFormatted.day + "-" + dateFormatted.month;

        return date;
    }
}
