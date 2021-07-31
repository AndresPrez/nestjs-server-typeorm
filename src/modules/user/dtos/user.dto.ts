import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'You must provide a username',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'You must provide a password',
  })
  @IsNotEmpty()
  @Length(4, 20)
  password: string;
}

export class GetUserDto {
  @ApiProperty({
    description: 'An ID for the user',
  })
  id: string;

  @ApiProperty({
    description: "The user's username",
  })
  username: string;
}

export class updateUserDto extends PartialType(CreateUserDto) {}
