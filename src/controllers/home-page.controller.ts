import { Controller, Get } from "@nestjs/common";

@Controller("/home")
export class HomePageController {
  @Get()
  public async handlerHomePage() {
    return "Home Page";
  }
}
