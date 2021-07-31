import { Logger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/user.dto';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(username: string): Promise<User> {
    const userInDB = await this.usersRepository.findOne({
      where: { username },
      relations: ['userRoles'],
    });
    this.logger.log(`Found user: ${JSON.stringify(userInDB)}`);
    return userInDB;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // TODO: use bcrypt lib or something similar to encrypt the user's signup password.w
  async createMany(users: CreateUserDto[]) {
    const userRepo = this.connection.getRepository(User);
    const user = userRepo.create(users[0]);
    const newUser = await userRepo.save(user);
    this.logger.log(`User '${newUser.username}' successfully signed up.`);
    return newUser;
  }
}
