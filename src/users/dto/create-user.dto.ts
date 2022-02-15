export class CreateUserDto {
  // @MinLength(5)
  name?: string;

  // @IsEmail()
  email: string;
}
