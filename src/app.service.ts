import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "API Rest test_usfx en ejecución.";
  }
}
