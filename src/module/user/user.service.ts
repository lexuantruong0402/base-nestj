import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Action } from '../casl/action';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  create(createUserDto: CreateUserDto, userRequest: User) {
    const ability = this.caslAbilityFactory.createForUser(userRequest);
    if (ability.can(Action.Manage, 'all')) {
      return this.userRepo.save(createUserDto);
    } else throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
  }

  async findAll() {
    const take = 10;
    const skip = 0;

    const [result, total] = await this.userRepo.findAndCount({
      take: take,
      skip: skip,
    });
    return {
      listUser: result,
      count: total,
    };
  }

  async findOne(id: number, userRequest: User) {
    const ability = this.caslAbilityFactory.createForUser(userRequest);
    const user = await this.userRepo.findOne(id);
    if (ability.can(Action.Manage, 'all') || ability.can(Action.Read, user)) {
      return user;
    } else throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
  }

  async update(id: number, updateUserDto: UpdateUserDto, userRequest: User) {
    const user = await this.userRepo.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(userRequest);
    if (ability.can(Action.Manage, 'all') || ability.can(Action.Update, user)) {
      updateUserDto.id = id;
      return this.userRepo.save(updateUserDto);
    } else throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
  }

  async remove(id: number, userRequest: User) {
    const user = await this.userRepo.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(userRequest);
    if (ability.can(Action.Manage, 'all') || ability.can(Action.Delete, user)) {
      return this.userRepo.delete(id);
    } else throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
  }

  findByLogin(loginUserDto: LoginUserDto) {
    return this.userRepo.findOne({ where: { email: loginUserDto.email } });
  }

  findByPayload({ email }: any) {
    return this.userRepo.findOne({ where: { email: email } });
  }
}
