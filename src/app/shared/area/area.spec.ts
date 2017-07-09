import { AreaComponent } from './area.component';
import {TestBed, async} from '@angular/core/testing';

describe('Area component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AreaComponent
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render correctly', () => {
    const fixture = TestBed.createComponent(AreaComponent);
    fixture.detectChanges();
    const area = fixture.nativeElement;
    expect(area.querySelector('area').className).toBe('area');
    const div = area.querySelector('div');
    expect(div).not.toBeNull();
    expect(div.className).toBe('area');
    const header = area.querySelector('header');
    expect(header).not.toBeNull();
    const footer = area.querySelector('footer');
    expect(footer).not.toBeNull();
    expect(footer.className).toBe('area__footer');
  });

//   it('should display active count when 0', () => {
//     const fixture = TestBed.createComponent(FooterComponent);
//     const footer = fixture.nativeElement;
//     const FooterCmp = fixture.componentInstance;
//     FooterCmp.activeCount = 0;
//     fixture.detectChanges();
//     expect(footer.querySelector('.todo-count').textContent.trim()).toBe('No items left');
//   });

//   it('should display active count when above 0', () => {
//     const fixture = TestBed.createComponent(FooterComponent);
//     const footer = fixture.nativeElement;
//     const FooterCmp = fixture.componentInstance;
//     FooterCmp.activeCount = 1;
//     fixture.detectChanges();
//     expect(footer.querySelector('.todo-count').textContent.trim()).toBe('1 item left');
//   });

//   it('should call onShow when a filter is clicked', () => {
//     const fixture = TestBed.createComponent(FooterComponent);
//     const footer = fixture.nativeElement;
//     const FooterCmp = fixture.componentInstance;
//     fixture.detectChanges();
//     spyOn(FooterCmp.onShow, 'emit');
//     footer.querySelectorAll('a')[1].dispatchEvent(new Event('click'));
//     expect(FooterCmp.onShow.emit).toHaveBeenCalledWith(SHOW_ACTIVE);
//   });

//   it('shouldnt show clear button when no completed todos', () => {
//     const fixture = TestBed.createComponent(FooterComponent);
//     const footer = fixture.nativeElement;
//     const FooterCmp = fixture.componentInstance;
//     FooterCmp.completedCount = 0;
//     fixture.detectChanges();
//     expect(footer.querySelector('.clear-completed')).toBeNull();
//   });

//   it('should call onClearCompleted on clear button click', () => {
//     const fixture = TestBed.createComponent(FooterComponent);
//     const footer = fixture.nativeElement;
//     const FooterCmp = fixture.componentInstance;
//     FooterCmp.completedCount = 1;
//     fixture.detectChanges();
//     spyOn(FooterCmp.onClearCompleted, 'emit');
//     footer.querySelector('.clear-completed').dispatchEvent(new Event('click'));
//     expect(FooterCmp.onClearCompleted.emit).toHaveBeenCalled();
//   });
});
