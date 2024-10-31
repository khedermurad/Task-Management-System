export class Task {
  id: number;
  description: string;
  status: string;

  constructor(id: number, description: string, status: string) {
    this.id = id;
    this.description = description;
    this.status = status;
  }
}
