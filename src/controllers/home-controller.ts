import { Controller, Get } from "@nestjs/common";

@Controller("/home")
export class HomeController {
  @Get()
  public async homePage(): Promise<string> {
    return "Home Page";
  }
}
