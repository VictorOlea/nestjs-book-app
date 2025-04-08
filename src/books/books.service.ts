import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(book);
  }

  async findAll(read?: boolean): Promise<Book[]> {
    if (read !== undefined) {
      return this.bookRepository.find({ where: { isRead: read } });
    }
    return this.bookRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const bookFound = await this.bookRepository.findOneBy({ id });
    if (!bookFound) {
      throw new NotFoundException(`Book with id ${id} does not exist`);
    }
    return bookFound;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const bookUpdate = await this.findOne(id);
    await this.bookRepository.update(id, updateBookDto);
    return bookUpdate;
  }

  async remove(id: number): Promise<Book> {
    const bookRemove = await this.findOne(id);
    await this.bookRepository.softDelete(id);
    return bookRemove;
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
