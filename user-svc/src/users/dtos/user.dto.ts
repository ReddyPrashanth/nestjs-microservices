import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(7, 20)
  password: string;
}

export class AddressDto {
  @Length(4, 30)
  address1: string;

  @Length(4, 30)
  address2: string;

  @Length(2, 15)
  city: string;

  @Length(2, 20)
  state: string;

  @Length(2, 15)
  country: string;

  @Length(5, 10)
  zipCode: string;

  @Length(4, 15)
  phone: string;
}

export class UserDto {
  @IsEmail()
  email: string;

  @Length(3, 25)
  firstName: string;

  @Length(3, 25)
  lastName: string;

  @Length(3, 25)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsOptional()
  @IsEnum(UserGender, { message: 'gender must be a valid value', each: true })
  gender: UserGender;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
