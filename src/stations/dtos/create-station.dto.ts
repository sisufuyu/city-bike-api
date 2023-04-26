import { IsInt, IsString, Min, IsNumber, MinLength } from 'class-validator';

export class CreateStationDTO {
  @IsInt()
  @Min(1)
  readonly id: number;

  @IsString()
  @MinLength(1)
  readonly name: string;

  @IsString()
  @MinLength(3)
  readonly address: string;

  @IsString()
  readonly city: string;

  @IsInt()
  readonly capacities: number;

  @IsNumber()
  readonly x: number;

  @IsNumber()
  readonly y: number;
}