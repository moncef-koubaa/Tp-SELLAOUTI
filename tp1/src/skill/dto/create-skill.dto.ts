import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  Designation: string;
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  cvIds: number[];
}
