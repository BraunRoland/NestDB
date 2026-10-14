import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { UjFestmenyDto } from './ujfestmeny.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }
  @Get('festmenyek')
  @Render('festmenyek')
  async getFestmenyek(@Query('minev') minev: string = '0') {
    return {
      db: await this.appService.festmenyDb(),
      festmenyek: await this.appService.festmenyLista(parseInt(minev)),
    }
  }
  @Get('ujfestmeny')
  @Render('festmenyform')
  async ujfestmeny() {
  }
  
  @Post('ujfestmeny')
  async ujFestmeny(@Body() body: UjFestmenyDto) {
    await this.appService.ujFestmeny(
      body.title, 
      body.painter, 
      parseInt(body.painted_at)
    );
    return "Sikeres beszúrás"
  }
}
