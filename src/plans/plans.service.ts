import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/createPlan.dto';
import { UpdatePlanDto } from './dto/updatePlan.dto';
import { Plan } from './entity/plan.entity';

@Injectable()
export class PlansService {
  private plans: Plan[] = [];
  private idCounter = 1;

  createPlan(@Body() body: CreatePlanDto) {
    const plan: Plan = {
      ...body,
      id: this.idCounter++,
      success: false,
      parentId: null,
    };
    this.plans.push(plan);

    return plan.id;
  }

  getManyPlans() {
    return this.plans;
  }

  getPlanById(planId: number) {
    const plan = this.plans.find((p) => p.id === planId);

    if (!plan) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    return plan;
  }

  updatePlan(planId: number, updatePlanDto: UpdatePlanDto) {
    const plan = this.plans.find((p) => p.id === planId);

    if (!plan) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    Object.assign(plan, updatePlanDto);

    return 'OK';
  }

  deletePlan(planId: number) {
    const planIndex = this.plans.findIndex((p) => p.id === planId);

    if (planIndex === -1) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    this.plans.splice(planIndex, 1);

    return 'No Content';
  }

  createSubplan(planId: number, data: CreatePlanDto) {
    const plan = this.plans.find((p) => p.id === planId);

    if (!plan) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    const subPlan: Plan = {
      ...data,
      id: this.idCounter++,
      success: false,
      parentId: plan.id,
    };
    this.plans.push(subPlan);

    return subPlan.id;
  }

  getSubplansByParentId(planId: number) {
    const plans = this.plans.filter((p) => p.parentId === planId);

    if (plans.length === 0) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    return plans;
  }
}
