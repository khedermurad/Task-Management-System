import { Task } from './task';

export class Project {
  id!: number;
  name!: string;
  startDate!: Date | null;
  endDate!: Date | null;
  tasks!: Task[];
}
