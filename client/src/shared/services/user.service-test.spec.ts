import {getTestBed, TestBed} from "@angular/core/testing";
import {UserService} from "./user.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../models/User";

describe("Testing the user Service", () => {
    let injector: TestBed;
    let service: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService],
        });

        injector = getTestBed();
        service = injector.get(UserService);
        httpMock = injector.get(HttpTestingController);
    });

    const dummyUserResponse : User =
        {id:"0", firstName:"Manni", lastName:"DelGardo", email:"manni@del.gardo", goal:30.00, monthlyCumulatedPayment:3, dueDate: {day: 7, month: 12}, subscriptionCounter:6};

    it('getUser() should return a valid user', () => {
        service.getUser().subscribe((res) => {
            expect(res).toEqual(dummyUserResponse);
        });

        const req = httpMock.expectOne('/api/v1/user');
        expect(req.request.method).toBe('GET');
        req.flush(dummyUserResponse);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('editUser() should put and return data', () => {
        service.editSubscriptionGoal(dummyUserResponse).subscribe((res) => {
            expect(res).toEqual({  });
        });

        const req = httpMock.expectOne('https://someUrl.com/association/');
        expect(req.request.method).toBe('POST');
        req.flush({ msg: 'success' });
    });
});