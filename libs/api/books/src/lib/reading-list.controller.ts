import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Book, ReadingListItem} from '@tmo/shared/models';
import { ReadingListService } from './reading-list.service';

@Controller()
export class ReadingListController {
  constructor(private readonly readingListService: ReadingListService) {}

  @Get('/reading-list/')
  async getReadingList(): Promise<ReadingListItem[]> {
    return await this.readingListService.getList();
  }

  @Post('/reading-list/')
  async addToReadingList(@Body() item: Book): Promise<void> {
    return await this.readingListService.addBook(item);
  }

  @Delete('/reading-list/:id')
  async removeFromReadingList(@Param() params):  Promise<void> {
    return await this.readingListService.removeBook(params.id);
  }
}
