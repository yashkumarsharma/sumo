import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

let fixture;
let compInstance;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        AppService
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compInstance = fixture.debugElement.componentInstance;
  }));

  it('should instantiate the component', () => {
    expect(compInstance).toBeTruthy();
    expect(compInstance.teams.length).toBe(4);
  });
  /* Sample Unit test case TS*/
  it('should check for the selectTeam method positive', () => {
    compInstance.selectTeam('Engineering');
    expect(compInstance.employeesOfSelectedTeam).toEqual(['Lawana Fan', 'Larry Rainer', 'Rahul Malik', 'Leah Shumway']);
  });

  it('should check for the selectTeam method negative', () => {
    compInstance.selectTeam('Executive');
    expect(compInstance.employeesOfSelectedTeam).not.toEqual(['Lawana Fan', 'Larry Rainer', 'Rahul Malik', 'Leah Shumway']);
  });

  /* Sample Unit test case HTML*/
  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Select an Employee');
  }));
});
