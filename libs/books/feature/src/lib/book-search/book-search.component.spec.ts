import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { Book } from "@tmo/shared/models";
import { MatSnackBar } from "@angular/material/snack-bar";

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should open the snackbar', () => {
    const book: Book = {
      id: 'V9s8sas',
      title: 'Java Programming',
      authors: ['John'],
      coverUrl:'https://image.com',
      description: '',
      publishedDate: '',
      publisher: ''
    };
    const snackbarSpy = spyOn(TestBed.inject(MatSnackBar), 'open');
    component.addBookToReadingList(book);
    expect(snackbarSpy).toHaveBeenCalled();
  });
});
