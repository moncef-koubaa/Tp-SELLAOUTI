import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateCvDto {
  @IsString()
  name: string;
  @IsString()
  firstName: string;
  @IsNumber()
  age: number;
  @IsNumber()
  CIN: number;
  @IsString()
  job: string;
  @IsString()
  path: string;
  @IsArray()
  @IsNumber({}, { each: true })
  skills: number[];
  @IsNumber()
  userId: number;
}
