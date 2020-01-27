import {DateFormatted} from "../models/DateFormatted";

export class DateFormatter {

    // Convert date string from date picker to date for database
    static formatDateToDB(date: string) {
        return  {
            day: Number(date.substring(8, 10)),
            month: Number(date.substring(5, 7))
        };
    }

    // Convert numerical date from database into string date
    static formatDateFromDB(dateFormatted: DateFormatted) {
        if (!dateFormatted || !dateFormatted.month || !dateFormatted.day)
            return "";

        let currYear: number = new Date().getFullYear();
        let currMonth: number  = new Date().getMonth() + 1; // Month starts with 0
        let currDay: number  = new Date().getDate();
        let year: number;

        // Calculate correct year of payment
        if(dateFormatted.month < currMonth){
            year = currYear + 1;
        }else if(dateFormatted.month == currMonth && dateFormatted.day < currDay){
            year = currYear + 1;
        }else{
            year = currYear;
        }

        // Adding zeros for correct display of data
        if(dateFormatted.month < 10 && dateFormatted.day < 10){
            return year + "-0" + dateFormatted.month + "-0" + dateFormatted.day;
        }else if(dateFormatted.day < 10){
            return year + "-" + dateFormatted.month + "-0" + dateFormatted.day;
        }else if(dateFormatted.month < 10){
            return year + "-0" + dateFormatted.month + "-" + dateFormatted.day;
        }else {
            return year + "-" + dateFormatted.month + "-" + dateFormatted.day;
        }
    }
}
