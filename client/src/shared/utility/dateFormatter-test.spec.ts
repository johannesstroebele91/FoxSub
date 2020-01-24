import { async } from "@angular/core/testing";
import {DateFormatter} from "./dateFormatter";

describe("formatDateFromDB", () => {
    it("Add correct Year to the date ", async(() => {
        let currYear: number = new Date().getFullYear();
        let currMonth: number  = new Date().getMonth() + 1;
        let currDay: number  = new Date().getDate();

        expect(DateFormatter.formatDateFromDB({day: currDay - 1, month: currMonth}))
            .toEqual((currYear+1) + "-" + (currDay-1) + "-" + currMonth);
    }))
});