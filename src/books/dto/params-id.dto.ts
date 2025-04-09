import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class ParamsIdDto {
  @Type(() => Number)
  @IsInt({ message: 'The id must be an integer' })
  @Min(1, { message: 'The id must be greater than zero' })
  id: number;
}
