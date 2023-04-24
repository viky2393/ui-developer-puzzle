import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from "@angular/material/snack-bar";
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks, getReadingList,
  ReadingListBook, removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { Observable } from "rxjs";

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  books$: Observable<ReadingListBook[]> = this.store.select(getAllBooks);

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  formatDate(date: string): string {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : '';
  }

  addBookToReadingList(book: Book): void {
    this.store.dispatch(addToReadingList({ book }));
    const snackBarRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(book.title + ' is added to reading list.', 'Undo');
    snackBarRef?.onAction().subscribe(() => {
      this.store.select(getReadingList).subscribe((readingList: ReadingListItem[]) => {
        const readingListItem: ReadingListItem[] = readingList.filter(list => list.bookId === book.id);
        if(readingListItem.length > 0) {
          this.store.dispatch(removeFromReadingList({ item: readingListItem[0] }));
        }
      });
    });
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
