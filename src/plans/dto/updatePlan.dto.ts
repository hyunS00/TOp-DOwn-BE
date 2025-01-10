import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
class ParentValidator implements ValidatorConstraintInterface {
  validate(value: any): Promise<boolean> | boolean {
    return value === null || typeof value === 'number';
  }
  defaultMessage?(): string {
    return '($value)는 유효하지 않는 ParentId 값입니다.';
  }
}

function IsNumberOrNull(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: ParentValidator,
    });
  };
}

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
  @IsNumberOrNull()
  parentId?: null | number;
}
