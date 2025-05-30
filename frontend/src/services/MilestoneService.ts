// Service for managing milestones
export interface Milestone {
  id: string;
  title: string;
  description?: string;
}

export class MilestoneService {
  private static instance: MilestoneService;
  private milestones: Milestone[] = [];

  private constructor() {}

  public static getInstance(): MilestoneService {
    if (!MilestoneService.instance) {
      MilestoneService.instance = new MilestoneService();
    }
    return MilestoneService.instance;
  }

  public createMilestone(title: string, description?: string): Milestone {
    const milestone: Milestone = {
      id: this.generateId(),
      title,
      description,
    };
    this.milestones.push(milestone);
    return milestone;
  }

  public getAllMilestones(): Milestone[] {
    return this.milestones;
  }

  public deleteMilestone(id: string): boolean {
    const idx = this.milestones.findIndex(m => m.id === id);
    if (idx === -1) return false;
    this.milestones.splice(idx, 1);
    return true;
  }

  public editMilestone(id: string, title: string, description?: string): boolean {
    const milestone = this.milestones.find(m => m.id === id);
    if (!milestone) return false;
    milestone.title = title;
    milestone.description = description;
    return true;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
