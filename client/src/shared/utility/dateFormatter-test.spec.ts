import {async} from "@angular/core/testing";
import {DateFormatter} from "./dateFormatter";

describe("DateFormatter", () => {
    describe("formatDateFromDB", () => {
        it("Add correct Year to the date | date.getMonth() > subscriptionMonth", async(() => {
            let date = new Date()

            spyOn(date, 'getFullYear').and.returnValue(2020);
            spyOn(date, 'getMonth').and.returnValue(10);
            spyOn(date, 'getDate').and.returnValue(5);
            expect(DateFormatter.formatDateFromDB({day: date.getDate(), month: date.getMonth()}))
                .toEqual((date.getFullYear()) + "-" +  (date.getMonth()<10? `0${date.getMonth()}`:date.getMonth()) + "-"
                    +  (date.getDate()<10? `0${date.getDate()}`:date.getDate()));
        }));

        it("Add correct Year to the date | date.getMonth() < subscriptionMonth", async(() => {
            let date = new Date();

            spyOn(date, 'getFullYear').and.returnValue(2020);
            spyOn(date, 'getMonth').and.returnValue(11);
            spyOn(date, 'getDate').and.returnValue(5);
            expect(DateFormatter.formatDateFromDB({day: date.getDate(), month: date.getMonth() -1}))
                .toEqual((date.getFullYear()) + "-" + (date.getMonth()<10? `0${date.getMonth()-1}`:date.getMonth()-1) + "-" +  (date.getDate()<10? `0${date.getDate()}`:date.getDate()));
        }));

        it("Add correct Year to the date | date.getDate() > subscriptionDay", async(() => {
            let date = new Date()

            spyOn(date, 'getFullYear').and.returnValue(2020);
            spyOn(date, 'getMonth').and.returnValue(1);
            spyOn(date, 'getDate').and.returnValue(2);
            expect(DateFormatter.formatDateFromDB({day: date.getDate(), month: date.getMonth()}))
                .toEqual((date.getFullYear() + 1) + "-" + (date.getMonth()<10? `0${date.getMonth()}`:date.getMonth()) + "-" +  (date.getDate()<10? `0${date.getDate()}`:date.getDate()));
        }));

        it("Add correct Year to the date | date.getDate() < subscriptionDay", async(() => {
            let date = new Date()

            spyOn(date, 'getFullYear').and.returnValue(2020);
            spyOn(date, 'getMonth').and.returnValue(10);
            spyOn(date, 'getDate').and.returnValue(5);
            expect(DateFormatter.formatDateFromDB({day: date.getDate(), month: date.getMonth()}))
                .toEqual((date.getFullYear()) + "-" + (date.getMonth()<10? `0${date.getMonth()}`:date.getMonth()) + "-" +  (date.getDate()<10? `0${date.getDate()}`:date.getDate()));
        }));

        it("Return empty string on invalid date", async(() => {
            let date = new Date()

            spyOn(date, 'getFullYear').and.returnValue(2020);
            spyOn(date, 'getMonth').and.returnValue(0);
            spyOn(date, 'getDate').and.returnValue(5);
            expect(DateFormatter.formatDateFromDB({day: date.getDate(), month: date.getMonth()}))
                .toEqual("");
        }));
    });
});