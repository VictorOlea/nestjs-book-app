import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { SearchBookDto } from './dto/search-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(@Query('read') read?: boolean): Promise<Book[]> {
    return this.booksService.findAll(read);
  }

  @Get('search')
  async findByName(@Query() query: SearchBookDto): Promise<Book[]> {
    return this.booksService.searchByName(query.title);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(+id, updateBookDto);
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string): Promise<Book> {
    return this.booksService.restore(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Book> {
    return this.booksService.remove(+id);
  }
}
