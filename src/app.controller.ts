import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

interface Plan {
  id: number;
  title: string;
  description: string;
  priority: string;
  success: boolean;
  startDate: string;
  endDate: string;
  parent: null | number;
}

interface RequestPlan {
  title: string;
  description: string;
  priority: string;
  startDate: string;
  endDate: string;
}
@Controller('plans')
export class AppController {
  private plans: Plan[] = [];
  private idCounter = 1;
  constructor(private readonly appService: AppService) {}

  @Get()
  getPlans(): Plan[] {
    return this.plans;
  }

  @Post()
  postPlan(@Body() data: RequestPlan): number {
    const plan: Plan = {
      ...data,
      id: this.idCounter++,
      success: false,
      parent: null,
    };
    this.plans.push(plan);

    return plan.id;
  }

  @Get(':planId')
  getPlan(@Param('planId') planId: string): Plan {
    const plan = this.plans.find((p) => p.id === +planId);

    if (!plan) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    return plan;
  }

  @Patch(':planId')
  patchPlan(@Param('planId') planId: string, @Body() newPlan: Plan): string {
    const plan = this.plans.find((p) => p.id === +planId);

    if (!plan) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    Object.assign(plan, newPlan);

    return 'OK';
  }

  @Delete(':planId')
  deletePlan(@Param('planId') planId: string): string {
    const planIndex = this.plans.findIndex((p) => p.id === +planId);

    if (planIndex === -1) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    this.plans.splice(planIndex, 1);

    return 'No Content';
  }

  @Post(':planId/subplans')
  postSubplan(
    @Param('planId') planId: number,
    @Body() data: RequestPlan,
  ): number {
    const plan = this.plans.find((p) => p.id === +planId);

    if (!plan) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    const subPlan: Plan = {
      ...data,
      id: this.idCounter++,
      success: false,
      parent: plan.id,
    };
    this.plans.push(subPlan);

    return subPlan.id;
  }

  @Get(':planId/subplans')
  getSubplans(@Param('planId') planId: number): Plan[] {
    const plans = this.plans.filter((p) => p.parent === +planId);

    if (plans.length === 0) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    return plans;
  }
}
