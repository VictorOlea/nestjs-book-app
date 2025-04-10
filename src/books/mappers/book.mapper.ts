import { Book } from '../entities/book.entity';
import { BookResponseDto } from '../dto/book-response.dto';

export function toBookResponseDto(book: Book): BookResponseDto {
  return {
    title: book.title,
    author: book.author,
    gender: book.gender,
  };
}

export function toBookResponseDtoArray(books: Book[]): BookResponseDto[] {
  return books.map(toBookResponseDto);
}
