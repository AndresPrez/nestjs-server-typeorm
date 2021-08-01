import { ConnectionOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';

export default {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'database',
  entities: [User, Role],
  logging: false,
  // synchronize: true,
  // dropSchema: false,
} as ConnectionOptions;
