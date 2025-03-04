import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Permission } from './user/entities/permission.entity';
import * as fs from 'fs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型为MySQL
      host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com', // TiDB Cloud的连接地址
      port: 4000, // 数据库连接端口
      username: '2CPUotZAoPJK8st.root', // 数据库用户名
      password: 'BUyZl82Uk52cWDHx', // 数据库密码
      database: 'fortune500', // 要连接的数据库名称
      synchronize: true, // 自动同步实体到数据库表结构
      logging: true, // 启用SQL查询日志记录
      entities: [User, Role, Permission], // 实体类数组，用于ORM映射
      poolSize: 10, // 连接池大小设置
      connectorPackage: 'mysql2', // 使用mysql2作为连接器
      extra: {
        authPlugins: 'sha256_password', // 使用sha256_password认证插件
      },
      ssl: {
        ca: fs.readFileSync('/etc/ssl/cert.pem'),
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
