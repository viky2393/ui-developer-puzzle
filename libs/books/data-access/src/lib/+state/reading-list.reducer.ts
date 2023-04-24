import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ReadingListActions from './reading-list.actions';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<ReadingListItem> {
  loaded: boolean;
  error: string;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<
  ReadingListItem
>({
  selectId: item => item.bookId
});

export const initialState: State = readingListAdapter.getInitialState({
  loaded: false,
  error: null
});

const readingListReducer = createReducer(
  initialState,
  on(ReadingListActions.init, state => {
    return {
      ...state,
      loaded: false,
      error: null
    };
  }),
  on(ReadingListActions.loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(ReadingListActions.loadReadingListError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(ReadingListActions.addToReadingList, (state, action) =>
    readingListAdapter.addOne({ bookId: action.book.id, ...action.book }, state)
  ),
  on(ReadingListActions.failedAddToReadingList, (state, action) =>
    readingListAdapter.removeOne(action.book.id, state)
  ),
  on(ReadingListActions.removeFromReadingList, (state, action) =>
    readingListAdapter.removeOne(action.item.bookId, state)
  ),
  on(ReadingListActions.failedRemoveFromReadingList, (state, action) => {
    const id: string = action.item.bookId;
    delete action.item.bookId;
    const book: Book = {id, ...action.item};
    return readingListAdapter.addOne({bookId: book.id, ...book}, state)
    }
  ),
  on(ReadingListActions.confirmedFinishFromReadingList, (state, action) => {
      const id: string = action.item.bookId;
      return readingListAdapter.updateOne({id: id, changes: action.item}, state)
    }
  ),
  on(ReadingListActions.failedFinishFromReadingList, (state, action) => {
      return {
        ...state,
        error: 'Api failed in finishing the book ' + action.item.title
      }
    }
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
