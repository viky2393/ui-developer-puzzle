import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';



@Injectable()
export class ReadingListService {
  private readonly key = '[okreads API] Reading List';
  private readonly storage = new StorageService<ReadingListItem[]>(this.key, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update(list => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        ...rest
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update(list => {
      return list.filter(x => x.bookId !== id);
    });
  }

  async updateBook(b: ReadingListItem): Promise<ReadingListItem> {
    const finishedBook: ReadingListItem = {...b, finished: true, finishedDate: new Date().toISOString()};
    this.storage.update(list => {
      const index: number = list.findIndex(x => x.bookId === finishedBook.bookId);
      list[index] = finishedBook;
      return list;
    });
    return finishedBook;
  }
}
