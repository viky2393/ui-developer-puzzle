import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import {Observable} from "rxjs";
import {ReadingListItem} from "@tmo/shared/models";

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$: Observable<ReadingListItem[]> = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item): void {
    this.store.dispatch(removeFromReadingList({ item }));
  }
}
