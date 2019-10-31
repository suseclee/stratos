import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CoreTestingModule } from '../../../../../../test-framework/core-test.modules';
import { createBasicStoreModule } from '../../../../../../test-framework/store-test-helper';
import { CoreModule } from '../../../../../core/core.module';
import { SharedModule } from '../../../../shared.module';
import { ListViewComponent } from './list-view.component';

describe('ListViewComponent', () => {
  let component: ListViewComponent<any>;
  let fixture: ComponentFixture<ListViewComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        CoreTestingModule,
        createBasicStoreModule(),
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    component.config = {
      getListConfig: () => null,
      updateDataSourceConfig: () => null,
      updateListConfig: () => null
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
