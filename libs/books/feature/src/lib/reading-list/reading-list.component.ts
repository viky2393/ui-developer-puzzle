import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { Observable } from "rxjs";
import { Book, ReadingListItem } from "@tmo/shared/models";
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$: Observable<ReadingListItem[]> = this.store.select(getReadingList);

  constructor(private readonly store: Store,
              private readonly snackBar: MatSnackBar) {}

  removeFromReadingList(item): void {
    this.store.dispatch(removeFromReadingList({item}));
    const snackBarRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(item.title + ' is removed from reading list.', 'Undo');
    snackBarRef?.onAction().subscribe(() => {
      const id = item.bookId;
      delete item.bookId;
      const book: Book = Object.assign({id, ...item});
      this.store.dispatch(addToReadingList({book}));
    });
  }
}
