export class Plan {
  id: number;
  title: string;
  description: string;
  priority: string;
  success: boolean;
  startDate: string;
  endDate: string;
  parentId: null | number;
}
