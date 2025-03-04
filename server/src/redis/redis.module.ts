import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'redis-11346.crce178.ap-east-1-1.ec2.redns.redis-cloud.com',
            port: 11346,
          },
          username: 'default',
          password: 'nP6ul5QvlNTiG2Esc4xAjMsHiwcCm8nx',
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
