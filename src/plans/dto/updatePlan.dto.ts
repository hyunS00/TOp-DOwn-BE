import { IsDateString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePlanDto {
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsOptional()
  priority?: string;

  @IsNotEmpty()
  @IsOptional()
  success?: boolean;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsInt()
  parentId?: null | number;
}
