import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookResponseDto } from './dto/book-response.dto';
import { toBookResponseDtoArray } from './mappers/book.mapper';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createBook = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(createBook);
  }

  async findAll(read?: boolean): Promise<BookResponseDto[]> {
    const books = await this.bookRepository.find({
      where: read !== undefined ? { isRead: read } : {},
      order: { id: 'ASC' },
    });

    return toBookResponseDtoArray(books);
  }

  async findOne(id: number): Promise<Book> {
    const foundBook = await this.bookRepository.findOneBy({ id });
    if (!foundBook) {
      throw new NotFoundException(`Book with id ${id} does not exist`);
    }
    return foundBook;
  }

  async searchByName(title: string): Promise<Book[]> {
    const searchBook = await this.bookRepository.find({
      where: {
        title: ILike(`%${title}%`),
      },
      order: {
        title: 'ASC',
      },
    });
    if (searchBook.length === 0) {
      throw new NotFoundException(`No books found with title contain ${title}`);
    }
    return searchBook;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.findOne(id);
    await this.bookRepository.update(id, updateBookDto);
    const updatedBook = await this.findOne(id);
    return updatedBook;
  }

  async remove(id: number): Promise<Book> {
    const removeBook = await this.findOne(id);
    await this.bookRepository.softDelete(id);
    return removeBook;
  }

  async restore(id: number): Promise<Book> {
    const deletedBook = await this.bookRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!deletedBook) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    await this.bookRepository.restore(id);

    return deletedBook;
  }
}
