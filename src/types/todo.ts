export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority?: number;
  due?: Date;
  estLength?: number;
  timeTaken?: number;
  snoozed?: boolean;
  created: number;
  complete: boolean;
}
