export class UpdatePlanDto {
  title: string;
  description: string;
  priority: string;
  success: boolean;
  startDate: string;
  endDate: string;
  parentId: null | number;
}
