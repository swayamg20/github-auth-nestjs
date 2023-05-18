import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActionController } from './action/action.controller';
import { HomeController } from './home/home.controller';
// import { GithubController } from './github/github.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GithubStrategy } from './auth/auth.strategy';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [
    AppController,
    ActionController,
    HomeController,
    // GithubController,
  ],
  providers: [AppService, GithubStrategy],
})
export class AppModule {}
