import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent],
    });

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit next event on nextPage()', () => {
    spyOn(component.next, 'emit');
    component.nextPage();
    expect(component.next.emit).toHaveBeenCalled();
  });

  it('should emit prev event on prevPage()', () => {
    spyOn(component.prev, 'emit');
    component.prevPage();
    expect(component.prev.emit).toHaveBeenCalled();
  });
});
