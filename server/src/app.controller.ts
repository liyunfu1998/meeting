import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { RequireLogin, UserInfo } from './custom.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('aaa')
  @SetMetadata('require-login', true)
  @SetMetadata('require-permission', ['ddd'])
  aaaa() {
    return 'aaaa';
  }

  @Get('bbb')
  @RequireLogin() // 等价于 @SetMetadata('require-login', true)
  bbbb() {
    return 'bbbb';
  }

  @Get('ccc')
  @RequireLogin()
  ccc(@UserInfo('username') username: string, @UserInfo() userInfo) {
    console.log('username', username);
    console.log('userInfo', userInfo);
    return 'ccc';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
