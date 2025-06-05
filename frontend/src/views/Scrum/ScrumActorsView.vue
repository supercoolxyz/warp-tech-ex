<template>
  <div class="container py-4 scrum-actors-view">
    <h1 class="mb-4">Scrum Actors Management</h1>
    <div class="actor-section mb-5" v-for="role in roles" :key="role">
      <h2>{{ role }}</h2>
      <form class="row g-2 align-items-center mb-3" @submit.prevent="addOrUpdateActor(role)">
        <div class="col-auto">
          <input v-model="actorForms[role].name" :placeholder="`Name of ${role}`" class="form-control" required />
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary">{{ actorForms[role].editingId ? 'Update' : 'Add' }}</button>
        </div>
        <div class="col-auto" v-if="actorForms[role].editingId">
          <button type="button" class="btn btn-secondary" @click="cancelEdit(role)">Cancel</button>
        </div>
      </form>
      <table v-if="getActorsByRole(role).length" class="table table-bordered table-striped actor-table">
        <thead class="table-light">
          <tr>
            <th>Name</th>
            <th style="width: 180px;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="actor in getActorsByRole(role)" :key="actor.id">
            <td>{{ actor.name }}</td>
            <td>
              <button class="btn btn-sm btn-outline-info me-2" @click="editActor(role, actor)">Edit</button>
              <button class="btn btn-sm btn-outline-danger" @click="removeActor(role, actor.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <em class="text-muted">No {{ role }}s yet.</em>
      </div>
    </div>
    <h2 class="mb-3">Relationships</h2>
    <form class="row g-2 align-items-center mb-3" @submit.prevent="addRelation">
      <div class="col-auto">
        <select v-model="relationForm.from" class="form-select" required>
          <option disabled value="">From Role</option>
          <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
        </select>
      </div>
      <div class="col-auto">
        <select v-model="relationForm.type" class="form-select" required>
          <option disabled value="">Relation Type</option>
          <option v-for="type in relationTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <div class="col-auto">
        <select v-model="relationForm.to" class="form-select" required>
          <option disabled value="">To Role</option>
          <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
        </select>
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary">
          {{ relationForm.editingIndex !== null ? 'Update' : 'Add' }} Relation
        </button>
      </div>
      <div class="col-auto" v-if="relationForm.editingIndex !== null">
        <button type="button" class="btn btn-secondary" @click="cancelRelationEdit">Cancel</button>
      </div>
    </form>
    <table class="table table-bordered table-striped">
      <thead class="table-light">
        <tr>
          <th>From</th>
          <th>Type</th>
          <th>To</th>
          <th style="width: 180px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rel, idx) in relations" :key="idx">
          <td>{{ rel.from }}</td>
          <td>{{ rel.type }}</td>
          <td>{{ rel.to }}</td>
          <td>
            <button class="btn btn-sm btn-outline-info me-2" @click="editRelation(idx)">Edit</button>
            <button class="btn btn-sm btn-outline-danger" @click="removeRelation(idx)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
// filepath: c:\Work\warp-tech\frontend\src\views\Scrum\ScrumActorsView.vue
import { Options, Vue } from 'vue-class-component';
import { ScrumRole, ScrumRelationType } from '@/models/ScrumActors';

type Actor = { id: string; name: string; role: ScrumRole };

type Relation = {
  from: ScrumRole;
  to: ScrumRole;
  type: ScrumRelationType;
};

function uuid() {
  return Math.random().toString(36).substr(2, 9);
}

@Options({})
export default class ScrumActorsView extends Vue {
  roles = Object.values(ScrumRole);
  relationTypes = Object.values(ScrumRelationType);

  actors: Record<ScrumRole, Actor[]> = {
    [ScrumRole.ProductOwner]: [],
    [ScrumRole.ScrumMaster]: [],
    [ScrumRole.Developer]: [],
    [ScrumRole.Stakeholder]: [],
    [ScrumRole.Customer]: [],
  };

  actorForms: Record<ScrumRole, { name: string; editingId: string | null }> = Object.fromEntries(
    this.roles.map(role => [role, { name: '', editingId: null }])
  ) as Record<ScrumRole, { name: string; editingId: string | null }>;

  relations: Relation[] = [];

  relationForm: {
    from: ScrumRole | '';
    to: ScrumRole | '';
    type: ScrumRelationType | '';
    editingIndex: number | null;
  } = {
    from: '',
    to: '',
    type: '',
    editingIndex: null,
  };

  getActorsByRole(role: ScrumRole) {
    return this.actors[role];
  }

  addOrUpdateActor(role: ScrumRole) {
    const form = this.actorForms[role];
    if (form.editingId) {
      const idx = this.actors[role].findIndex(a => a.id === form.editingId);
      if (idx !== -1) this.actors[role][idx].name = form.name;
      form.editingId = null;
    } else {
      this.actors[role].push({ id: uuid(), name: form.name, role });
    }
    form.name = '';
  }

  editActor(role: ScrumRole, actor: Actor) {
    this.actorForms[role].name = actor.name;
    this.actorForms[role].editingId = actor.id;
  }

  removeActor(role: ScrumRole, id: string) {
    this.actors[role] = this.actors[role].filter(a => a.id !== id);
    if (this.actorForms[role].editingId === id) {
      this.actorForms[role].editingId = null;
      this.actorForms[role].name = '';
    }
  }

  cancelEdit(role: ScrumRole) {
    this.actorForms[role].editingId = null;
    this.actorForms[role].name = '';
  }

  addRelation() {
    if (
      !this.relationForm.from ||
      !this.relationForm.to ||
      !this.relationForm.type ||
      this.relationForm.from === this.relationForm.to
    )
      return;
    if (this.relationForm.editingIndex !== null) {
      this.relations[this.relationForm.editingIndex] = {
        from: this.relationForm.from,
        to: this.relationForm.to,
        type: this.relationForm.type,
      };
      this.relationForm.editingIndex = null;
    } else {
      this.relations.push({
        from: this.relationForm.from,
        to: this.relationForm.to,
        type: this.relationForm.type,
      });
    }
    this.relationForm.from = '';
    this.relationForm.to = '';
    this.relationForm.type = '';
  }

  editRelation(idx: number) {
    const rel = this.relations[idx];
    this.relationForm.from = rel.from;
    this.relationForm.to = rel.to;
    this.relationForm.type = rel.type;
    this.relationForm.editingIndex = idx;
  }

  removeRelation(idx: number) {
    this.relations.splice(idx, 1);
    this.cancelRelationEdit();
  }

  cancelRelationEdit() {
    this.relationForm.from = '';
    this.relationForm.to = '';
    this.relationForm.type = '';
    this.relationForm.editingIndex = null;
  }
}
</script>

<style scoped>
/* Remove most custom styles to let Bootstrap shine */
.scrum-actors-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}
.actor-section {
  margin-bottom: 32px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 16px;
}
</style>