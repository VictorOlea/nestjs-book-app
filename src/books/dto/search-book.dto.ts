import { IsNotEmpty, IsString } from 'class-validator';

export class SearchBookDto {
  @IsString()
  @IsNotEmpty({ message: 'The title query parameter must not be empty' })
  title: string;
}
