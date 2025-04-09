import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FilterBookDto {
  @IsOptional()
  @IsBoolean({ message: 'The read must be an boolean' })
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  read?: boolean;
}
