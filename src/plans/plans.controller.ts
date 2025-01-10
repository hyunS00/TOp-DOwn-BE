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
import { CreatePlanDto } from './dto/createPlan.dto';
import { UpdatePlanDto } from './dto/updatePlan.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  getPlans() {
    return this.plansService.getManyPlans();
  }

  @Post()
  postPlan(@Body() body: CreatePlanDto) {
    return this.plansService.createPlan(body);
  }

  @Get(':planId')
  getPlan(@Param('planId') planId: string) {
    return this.plansService.getPlanById(+planId);
  }

  @Patch(':planId')
  patchPlan(@Param('planId') planId: string, @Body() body: UpdatePlanDto) {
    return this.plansService.updatePlan(+planId, body);
  }

  @Delete(':planId')
  deletePlan(@Param('planId') planId: string) {
    return this.plansService.deletePlan(+planId);
  }

  @Post(':planId/subplans')
  postSubplan(@Param('planId') planId: number, @Body() body: CreatePlanDto) {
    return this.plansService.createSubplan(+planId, body);
  }

  @Get(':planId/subplans')
  getSubplans(@Param('planId') planId: number) {
    return this.plansService.getSubplansByParentId(+planId);
  }
}
