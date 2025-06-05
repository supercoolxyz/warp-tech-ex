// Represents a generic person in the Scrum environment
export interface ScrumActor {
  id: string;
  name: string;
  role: ScrumRole;
}

// Enum for Scrum roles
export enum ScrumRole {
  ProductOwner = 'Product Owner',
  ScrumMaster = 'Scrum Master',
  Developer = 'Developer',
  Stakeholder = 'Stakeholder',
  Customer = 'Customer'
}

// Product Owner actor
export interface ProductOwner extends ScrumActor {
  role: ScrumRole.ProductOwner;
  // Product Owner specific dependencies
  stakeholders: Stakeholder[];
  scrumMaster: ScrumMaster;
  developers: Developer[];
}

// Scrum Master actor
export interface ScrumMaster extends ScrumActor {
  role: ScrumRole.ScrumMaster;
  productOwner: ProductOwner;
  developers: Developer[];
}

// Developer actor
export interface Developer extends ScrumActor {
  role: ScrumRole.Developer;
  scrumMaster: ScrumMaster;
  productOwner: ProductOwner;
}

// Stakeholder actor
export interface Stakeholder extends ScrumActor {
  role: ScrumRole.Stakeholder;
  productOwner: ProductOwner;
  customers: Customer[];
}

// Customer actor
export interface Customer extends ScrumActor {
  role: ScrumRole.Customer;
  stakeholder: Stakeholder;
}

// Define all relations between Scrum actors
export enum ScrumRelationType {
  Represents = 'is represented by',
  Manages = 'manages',
  ProvidesFeedback = 'provides feedback to',
  CommunicatesWith = 'communicates with',
  CollaboratesWith = 'collaborates with',
  Supports = 'supports',
  Facilitates = 'facilitates',
  DeliversTo = 'delivers to',
  IsSupportedBy = 'is supported by',
}

// Relation interface
export interface ScrumRelation {
  from: ScrumRole;
  to: ScrumRole;
  type: ScrumRelationType;
}

// All relations between Scrum actors
export const SCRUM_ACTOR_RELATIONS: ScrumRelation[] = [
  { from: ScrumRole.Customer, to: ScrumRole.Stakeholder, type: ScrumRelationType.Represents },
  { from: ScrumRole.Stakeholder, to: ScrumRole.Customer, type: ScrumRelationType.Manages },
  { from: ScrumRole.Stakeholder, to: ScrumRole.ProductOwner, type: ScrumRelationType.ProvidesFeedback },
  { from: ScrumRole.ProductOwner, to: ScrumRole.Stakeholder, type: ScrumRelationType.CommunicatesWith },
  { from: ScrumRole.ProductOwner, to: ScrumRole.ScrumMaster, type: ScrumRelationType.CollaboratesWith },
  { from: ScrumRole.ProductOwner, to: ScrumRole.Developer, type: ScrumRelationType.Manages },
  { from: ScrumRole.ScrumMaster, to: ScrumRole.ProductOwner, type: ScrumRelationType.Supports },
  { from: ScrumRole.ScrumMaster, to: ScrumRole.Developer, type: ScrumRelationType.Facilitates },
  { from: ScrumRole.Developer, to: ScrumRole.ProductOwner, type: ScrumRelationType.DeliversTo },
  { from: ScrumRole.Developer, to: ScrumRole.ScrumMaster, type: ScrumRelationType.IsSupportedBy },
];

// Entity-level relations for Scrum actors
export interface ScrumActorEntityRelations {
  productOwner?: ProductOwner;
  scrumMaster?: ScrumMaster;
  developers?: Developer[];
  stakeholders?: Stakeholder[];
  customers?: Customer[];
  stakeholder?: Stakeholder;
  productOwners?: ProductOwner[];
  scrumMasters?: ScrumMaster[];
}

// Example: Extend each actor with their entity relations
export interface ProductOwnerEntity extends ProductOwner, ScrumActorEntityRelations {
  stakeholders: Stakeholder[];
  scrumMaster: ScrumMaster;
  developers: Developer[];
}

// Extend Scrum Master with its relations
export interface ScrumMasterEntity extends ScrumMaster, ScrumActorEntityRelations {
  productOwner: ProductOwner;
  developers: Developer[];
}

// Extend Developer with its relations
export interface DeveloperEntity extends Developer, ScrumActorEntityRelations {
  scrumMaster: ScrumMaster;
  productOwner: ProductOwner;
}

// Extend Stakeholder with its relations
export interface StakeholderEntity extends Stakeholder, ScrumActorEntityRelations {
  productOwner: ProductOwner;
  customers: Customer[];
}

// Extend Customer with its relations
export interface CustomerEntity extends Customer, ScrumActorEntityRelations {
  stakeholder: Stakeholder;
}