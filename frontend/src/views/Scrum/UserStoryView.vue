<template>
  <div class="user-story-view">
    <h1>User Stories</h1>
    <div class="create-story">
      <input v-model="newTitle" placeholder="User story title" />
      <input v-model="newDesc" placeholder="Description (optional)" />
      <button v-if="!editingId" @click="createStory">Add User Story</button>
      <button v-if="editingId" @click="updateStory">Update User Story</button>
      <button v-if="editingId" @click="cancelEdit" type="button">Cancel</button>
    </div>
    <div v-if="stories.length === 0">
      <p>No user stories yet. Create your first one!</p>
    </div>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="story in stories" :key="story.id" class="story-item">
          <td>{{ story.id }}</td>
          <td>{{ story.title }}</td>
          <td>{{ story.description }}</td>
          <td>
            <button @click="startEdit(story)">Edit</button>
            <button @click="deleteStory(story.id)">Delete</button>
            <button @click="exportStory(story)">Export</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="margin-top: 20px;">
      <button v-if="stories.length > 0" @click="exportAllStories">Export All User Stories to Table</button>
    </div>
    <div v-if="exportedStory">
      <h2>Exported User Story Table</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ exportedStory.id }}</td>
            <td>{{ exportedStory.title }}</td>
            <td>{{ exportedStory.description }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="exportedStory = null">Close Table</button>
    </div>
    <div v-if="exportedAll">
      <h2>All User Stories Table</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="story in stories" :key="story.id">
            <td>{{ story.id }}</td>
            <td>{{ story.title }}</td>
            <td>{{ story.description }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="exportedAll = false">Close Table</button>
    </div>
  </div>
</template>

<script lang="ts">
// filepath: c:\Work\warp-tech\frontend\src\views\Scrum\UserStoryView.vue
import { Options, Vue } from 'vue-class-component';
import { UserStoryService, UserStory } from '@/services/UserStoryService';

@Options({})
export default class UserStoryView extends Vue {
  stories: UserStory[] = [];
  newTitle = '';
  newDesc = '';
  editingId: string | null = null;
  exportedStory: UserStory | null = null;
  exportedAll: boolean = false;

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

  startEdit(story: UserStory) {
    this.editingId = story.id;
    this.newTitle = story.title;
    this.newDesc = story.description || '';
  }

  updateStory() {
    if (!this.editingId) return;
    UserStoryService.getInstance().editUserStory(this.editingId, this.newTitle, this.newDesc || undefined);
    this.editingId = null;
    this.newTitle = '';
    this.newDesc = '';
    this.refreshStories();
  }

  cancelEdit() {
    this.editingId = null;
    this.newTitle = '';
    this.newDesc = '';
  }

  deleteStory(id: string) {
    UserStoryService.getInstance().deleteUserStory(id);
    // If the deleted story was being edited, cancel edit mode
    if (this.editingId === id) {
      this.cancelEdit();
    }
    this.refreshStories();
  }

  exportStory(story: UserStory) {
    this.exportedStory = story;
    this.exportedAll = false;
  }

  exportAllStories() {
    this.exportedAll = true;
    this.exportedStory = null;
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
  align-items: left;
  gap: 10px;
  margin-bottom: 8px;
}
table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
}
</style>
