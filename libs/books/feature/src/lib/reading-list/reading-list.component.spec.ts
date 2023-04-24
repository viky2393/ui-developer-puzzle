import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { ReadingListItem } from "@tmo/shared/models";
import { MatSnackBar } from "@angular/material/snack-bar";

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the snackbar', () => {
    const book: ReadingListItem = {
      bookId: 'V9s8sas',
      title: 'Java Programming',
      authors: ['John'],
      coverUrl:'http://image.com',
      description: '',
      publishedDate: '',
      publisher: ''
    };
    const snackbarSpy = spyOn(TestBed.inject(MatSnackBar), 'open');
    component.removeFromReadingList(book);
    expect(snackbarSpy).toHaveBeenCalled();
  });
});
