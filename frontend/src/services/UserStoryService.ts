// Service for managing user stories
export interface UserStory {
  id: string;
  title: string;
  description?: string;
}

export class UserStoryService {
  private static instance: UserStoryService;
  private stories: UserStory[] = [];

  private constructor() {}

  public static getInstance(): UserStoryService {
    if (!UserStoryService.instance) {
      UserStoryService.instance = new UserStoryService();
    }
    return UserStoryService.instance;
  }

  public createUserStory(title: string, description?: string): UserStory {
    const story: UserStory = {
      id: this.generateId(),
      title,
      description,
    };
    this.stories.push(story);
    return story;
  }

  public getAllStories(): UserStory[] {
    return this.stories;
  }

  public deleteUserStory(id: string): boolean {
    const idx = this.stories.findIndex(s => s.id === id);
    if (idx === -1) return false;
    this.stories.splice(idx, 1);
    return true;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
