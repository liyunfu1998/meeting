import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Permission } from './user/entities/permission.entity';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import * as fs from 'fs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { PermissionGuard } from './permission.guard';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql', // 数据库类型为MySQL
          host: configService.get('mysql_server_host'), // TiDB Cloud的连接地址
          port: configService.get('mysql_server_port'), // 数据库连接端口
          username: configService.get('mysql_server_username'), // 数据库用户名
          password: configService.get('mysql_server_password'), // 数据库密码
          database: configService.get('mysql_server_database'), // 要连接的数据库名称
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
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: '30m', // token过期时间 30分钟
          },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    RedisModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
