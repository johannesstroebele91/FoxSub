import { async } from "@angular/core/testing";
import {DateFormatter} from "../utility/dateFormatter";
import {UserResolver} from "../resolver/user.resolver";
import {User} from "../models/User";

describe("user.service", () => {
    it("Test if getUser returns an valid user", async(() => {
        expect(this.activatedRoute.snapshot.data.user)
            .toBeInstanceOf(UserResolver);
    }));
});