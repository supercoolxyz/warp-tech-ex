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