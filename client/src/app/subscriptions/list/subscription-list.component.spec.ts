import { SubscriptionListComponent } from "./subscription-list.component"
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { TestHelperModule } from "../../../shared/utility/test-helper.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { of } from "rxjs";

describe('SubscriptionListComponent', () => {
    let component: SubscriptionListComponent;
    let fixture: ComponentFixture<SubscriptionListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestHelperModule,
            ],
            declarations: [SubscriptionListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubscriptionListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    describe('ngOnInit', () => {
        it('should fetch and set subscriptions', () => {
            spyOn(component['subscriptionsService'], 'getSubscriptions').and.returnValue(of([{ uuid: 'test' }]));

            component.ngOnInit();

            expect(component['subscriptionsService'].getSubscriptions).toHaveBeenCalled();
            expect(component.subscriptions).toEqual([{ uuid: 'test' }])
        })
    })
})
