import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  getPlans() {
    return this.plansService.getManyPlans();
  }

  @Post()
  postPlan(@Body() data) {
    return this.plansService.createPlan(data);
  }

  @Get(':planId')
  getPlan(@Param('planId') planId: string) {
    return this.plansService.getPlanById(+planId);
  }

  @Patch(':planId')
  patchPlan(@Param('planId') planId: string, @Body() newPlan): string {
    return this.plansService.updatePlan(+planId, newPlan);
  }

  @Delete(':planId')
  deletePlan(@Param('planId') planId: string): string {
    return this.plansService.deletePlan(+planId);
  }

  @Post(':planId/subplans')
  postSubplan(@Param('planId') planId: number, @Body() data): number {
    return this.plansService.createSubplan(+planId, data);
  }

  @Get(':planId/subplans')
  getSubplans(@Param('planId') planId: number) {
    return this.plansService.getSubplansByParentId(+planId);
  }
}
