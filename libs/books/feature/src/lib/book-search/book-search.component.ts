import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { addToReadingList, clearSearch, getAllBooks, ReadingListBook, searchBooks } from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books$: Observable<ReadingListBook[]> = this.store.select(getAllBooks);

  searchForm = this.fb.group({
    term: ''
  });

  @ViewChild('bookSearchInput', {static: true}) bookSearchInput: ElementRef;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.searchForm.get('term').valueChanges.pipe(
      map((value) => {
        if (value.trim().length === 0) {
          this.store.dispatch(clearSearch())
        }
        return value;
      }),
      filter(value => value.length > 0 && value.trim().length > 0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(async () =>
        this.store.dispatch(searchBooks({term: this.searchTerm})))
    ).subscribe();
  }

  formatDate(date: string): string {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : '';
  }

  addBookToReadingList(book: Book): void {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample(): void {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks(): void {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
