// Service for managing sprints
export interface Sprint {
  id: string;
  title: string;
  description?: string;
}

export class SprintService {
  private static instance: SprintService;
  private sprints: Sprint[] = [];

  private constructor() {}

  public static getInstance(): SprintService {
    if (!SprintService.instance) {
      SprintService.instance = new SprintService();
    }
    return SprintService.instance;
  }

  public createSprint(title: string, description?: string): Sprint {
    const sprint: Sprint = {
      id: this.generateId(),
      title,
      description,
    };
    this.sprints.push(sprint);
    return sprint;
  }

  public getAllSprints(): Sprint[] {
    return this.sprints;
  }

  public deleteSprint(id: string): boolean {
    const idx = this.sprints.findIndex(s => s.id === id);
    if (idx === -1) return false;
    this.sprints.splice(idx, 1);
    return true;
  }

  public editSprint(id: string, title: string, description?: string): boolean {
    const sprint = this.sprints.find(s => s.id === id);
    if (!sprint) return false;
    sprint.title = title;
    sprint.description = description;
    return true;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
