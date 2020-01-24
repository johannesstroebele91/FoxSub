import {async, TestBed} from "@angular/core/testing";
import {DateFormatter} from "./dateFormatter";

describe("DateFormatter", () => {
    describe("formatDateFromDB", () => {
        let currYear: number = new Date().getFullYear();
        let currMonth: number = new Date().getMonth()+1;
        let currDay: number = new Date().getDate();

        it("Add correct Year to the date | currMonth > subscriptionMonth", async(() => {

            expect(DateFormatter.formatDateFromDB({day: currDay, month: currMonth}))
                .toEqual((currYear + 1) + "-" + currDay + "-" + (currMonth));
        }));

        //TODO fix tests
        it("Add correct Year to the date | currMonth < subscriptionMonth", async(() => {
            expect(DateFormatter.formatDateFromDB({day: currDay, month: currMonth}))
                .toEqual((currYear) + "-" + currDay + "-" + (currMonth));
        }));

        it("Add correct Year to the date | currDay > subscriptionDay", async(() => {

            expect(DateFormatter.formatDateFromDB({day: currDay - 1, month: currMonth}))
                .toEqual((currYear + 1) + "-" + (currDay) + "-" + currMonth);
        }));

        it("Add correct Year to the date | currDay < subscriptionDay", async(() => {

            expect(DateFormatter.formatDateFromDB({day: currDay - 1, month: currMonth}))
                .toEqual((currYear) + "-" + (currDay) + "-" + currMonth);
        }));
    });

    describe("formatDateToDB", () => {
        //TODO
    });
});