import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/createPlan.dto';
import { UpdatePlanDto } from './dto/updatePlan.dto';
import { Plan } from './entity/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}
  async createPlan(@Body() createPlanDto: CreatePlanDto) {
    const plan = await this.planRepository.save({
      ...createPlanDto,
      success: false,
      parentId: null,
    });

    return plan.id;
  }

  getManyPlans() {
    return this.planRepository.find();
  }

  async getPlanById(planId: number) {
    const plan = this.planRepository.findOne({ where: { id: planId } });

    if (!plan) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    return plan;
  }

  async updatePlan(planId: number, updatePlanDto: UpdatePlanDto) {
    const plan = this.planRepository.findOne({ where: { id: planId } });

    if (!plan) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    this.planRepository.update({ id: planId }, updatePlanDto);

    return 'OK';
  }

  async deletePlan(planId: number) {
    const plan = this.planRepository.findOne({ where: { id: planId } });

    if (!plan) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    await this.planRepository.delete(planId);

    return 'No Content';
  }

  async createSubplan(planId: number, createPlanDto: CreatePlanDto) {
    const plan = this.planRepository.findOne({ where: { id: planId } });

    if (!plan) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    const subPlan = await this.planRepository.save({
      ...createPlanDto,
      success: false,
      parentId: (await plan).id,
    });

    return subPlan.id;
  }

  getSubplansByParentId(planId: number) {
    const plans = this.planRepository.findOne({ where: { parentId: planId } });

    if (!plans) {
      throw new NotFoundException('해당하는 id의 계획이 없습니다.');
    }

    return plans;
  }
}
