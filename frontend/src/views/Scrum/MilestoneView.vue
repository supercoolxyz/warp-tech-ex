<template>
  <div class="milestone-view">
    <h1>Milestones</h1>
    <div class="create-milestone">
      <input v-model="newTitle" placeholder="Milestone title" />
      <input v-model="newDesc" placeholder="Description (optional)" />
      <button @click="createMilestone">Add Milestone</button>
    </div>
    <div v-if="milestones.length === 0">
      <p>No milestones yet. Create your first one!</p>
    </div>
    <ul v-else>
      <li v-for="milestone in milestones" :key="milestone.id" class="milestone-item">
        <div v-if="editId !== milestone.id">
          <strong>{{ milestone.title }}</strong>
          <span v-if="milestone.description">- {{ milestone.description }}</span>
          <button @click="startEdit(milestone)">Edit</button>
          <button @click="deleteMilestone(milestone.id)">Delete</button>
        </div>
        <div v-else>
          <input v-model="editTitle" placeholder="Milestone title" />
          <input v-model="editDesc" placeholder="Description (optional)" />
          <button @click="saveEdit(milestone.id)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { MilestoneService, Milestone } from '@/services/MilestoneService';

@Options({})
export default class MilestoneView extends Vue {
  milestones: Milestone[] = [];
  newTitle = '';
  newDesc = '';
  editId: string | null = null;
  editTitle = '';
  editDesc = '';

  mounted() {
    this.refreshMilestones();
  }

  refreshMilestones() {
    this.milestones = MilestoneService.getInstance().getAllMilestones();
  }

  createMilestone() {
    if (!this.newTitle) return;
    MilestoneService.getInstance().createMilestone(this.newTitle, this.newDesc || undefined);
    this.newTitle = '';
    this.newDesc = '';
    this.refreshMilestones();
  }

  deleteMilestone(id: string) {
    MilestoneService.getInstance().deleteMilestone(id);
    this.refreshMilestones();
  }

  startEdit(milestone: Milestone) {
    this.editId = milestone.id;
    this.editTitle = milestone.title;
    this.editDesc = milestone.description || '';
  }

  saveEdit(id: string) {
    MilestoneService.getInstance().editMilestone(id, this.editTitle, this.editDesc);
    this.editId = null;
    this.editTitle = '';
    this.editDesc = '';
    this.refreshMilestones();
  }

  cancelEdit() {
    this.editId = null;
    this.editTitle = '';
    this.editDesc = '';
  }
}
</script>

<style scoped>
.milestone-view {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}
.create-milestone {
  margin-bottom: 20px;
}
.milestone-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
</style>
