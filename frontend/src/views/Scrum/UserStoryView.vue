<template>
  <div class="user-story-view">
    <h1>User Stories</h1>
    <div class="create-story">
      <input v-model="newTitle" placeholder="User story title" />
      <input v-model="newDesc" placeholder="Description (optional)" />
      <button @click="createStory">Add User Story</button>
    </div>
    <div v-if="stories.length === 0">
      <p>No user stories yet. Create your first one!</p>
    </div>
    <ul v-else>
      <li v-for="story in stories" :key="story.id" class="story-item">
        <strong>{{ story.title }}</strong>
        <span v-if="story.description">- {{ story.description }}</span>
        <button @click="deleteStory(story.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { UserStoryService, UserStory } from '@/services/UserStoryService';

@Options({})
export default class UserStoryView extends Vue {
  stories: UserStory[] = [];
  newTitle = '';
  newDesc = '';

  mounted() {
    this.refreshStories();
  }

  refreshStories() {
    this.stories = UserStoryService.getInstance().getAllStories();
  }

  createStory() {
    if (!this.newTitle) return;
    UserStoryService.getInstance().createUserStory(this.newTitle, this.newDesc || undefined);
    this.newTitle = '';
    this.newDesc = '';
    this.refreshStories();
  }

  deleteStory(id: string) {
    UserStoryService.getInstance().deleteUserStory(id);
    this.refreshStories();
  }
}
</script>

<style scoped>
.user-story-view {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}
.create-story {
  margin-bottom: 20px;
}
.story-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
</style>
