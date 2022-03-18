import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: Role })
  role: string;
}
