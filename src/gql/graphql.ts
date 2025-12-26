/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: { input: any; output: any; }
};

export type AddServiceToRepairInput = {
  customPrice?: InputMaybe<Scalars['String']['input']>;
  customServiceName?: InputMaybe<Scalars['String']['input']>;
  performerIds?: InputMaybe<Array<Scalars['String']['input']>>;
  repairOrderId: Scalars['String']['input'];
  serviceId?: InputMaybe<Scalars['String']['input']>;
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['JWT']['output'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT']['output'];
  user: User;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type CreateCurrencyInput = {
  code: Scalars['String']['input'];
  isRetailDefault?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  symbol: Scalars['String']['input'];
};

export type CreateExchangeRateInput = {
  currencyId: Scalars['String']['input'];
  rate: Scalars['String']['input'];
};

export type CreateIncomingInvoiceInput = {
  currencyId: Scalars['String']['input'];
  dateReceived: Scalars['DateTime']['input'];
  invoiceNumber: Scalars['String']['input'];
  items: Array<CreateIncomingInvoiceItemInput>;
  supplierId: Scalars['String']['input'];
};

export type CreateIncomingInvoiceItemInput = {
  pricePurchase: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  sparePartId: Scalars['String']['input'];
};

export type CreateOfficeInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrganizationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOutgoingInvoiceInput = {
  invoiceNumber: Scalars['String']['input'];
  items: Array<CreateOutgoingInvoiceItemInput>;
  reason: OutgoingReason;
  repairOrderId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOutgoingInvoiceItemInput = {
  customSalePrice?: InputMaybe<Scalars['String']['input']>;
  stockItemSerial: Scalars['String']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateRepairOrderInput = {
  agreedPrice?: InputMaybe<Scalars['String']['input']>;
  assignedMasterId: Scalars['String']['input'];
  clientId?: InputMaybe<Scalars['String']['input']>;
  deviceName: Scalars['String']['input'];
  deviceSerial?: InputMaybe<Scalars['String']['input']>;
  problemDescription?: InputMaybe<Scalars['String']['input']>;
};

export type CreateServiceInput = {
  cost?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateSparePartInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  priceRetail?: InputMaybe<Scalars['String']['input']>;
  priceRetailCurrencyId?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
};

export type CreateStorageLocationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  officeId: Scalars['String']['input'];
};

export type CreateSupplierInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  defaultCurrencyId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  additionalName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  officeId: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  role: Role;
};

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['String']['output'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRetailDefault: Scalars['Boolean']['output'];
  latestRate?: Maybe<ExchangeRate>;
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdById: Scalars['String']['output'];
  currency: Currency;
  currencyId: Scalars['String']['output'];
  effectiveDate: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  rate: Scalars['Float']['output'];
};

export type FirstUserSignupInput = {
  email: Scalars['String']['input'];
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
  officeName: Scalars['String']['input'];
  organizationName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type GoogleLoginInput = {
  idToken: Scalars['String']['input'];
};

export type GoogleSignupInput = {
  idToken: Scalars['String']['input'];
  officeName: Scalars['String']['input'];
  organizationName: Scalars['String']['input'];
};

export type IncomingInvoice = {
  __typename?: 'IncomingInvoice';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  currency: Currency;
  currencyId: Scalars['String']['output'];
  dateReceived: Scalars['DateTime']['output'];
  exchangeRateSnapshot: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  invoiceNumber: Scalars['String']['output'];
  items?: Maybe<Array<IncomingInvoiceItem>>;
  processedBy: User;
  processedById: Scalars['String']['output'];
  supplier: Supplier;
  supplierId: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type IncomingInvoiceItem = {
  __typename?: 'IncomingInvoiceItem';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  incomingInvoice: IncomingInvoice;
  incomingInvoiceId: Scalars['String']['output'];
  pricePurchase: Scalars['Float']['output'];
  quantity: Scalars['Int']['output'];
  sparePart: SparePart;
  sparePartId: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type InstallStockItemInput = {
  customPrice?: InputMaybe<Scalars['String']['input']>;
  performerIds?: InputMaybe<Array<Scalars['String']['input']>>;
  repairOrderId: Scalars['String']['input'];
  stockItemId: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addServiceToRepair: RepairOrderItem;
  changePassword: User;
  createCurrency: Currency;
  createExchangeRate: ExchangeRate;
  createIncomingInvoice: IncomingInvoice;
  createOffice: Office;
  createOrganization: Organization;
  createOutgoingInvoice: OutgoingInvoice;
  createPost: Post;
  createRepairOrder: RepairOrder;
  createService: Service;
  createSparePart: SparePart;
  createStorageLocation: StorageLocation;
  createSupplier: Supplier;
  createUser: User;
  deleteService: Service;
  ensureDefaultCurrencies: Array<Currency>;
  firstUserSignup: Auth;
  googleLogin: Auth;
  googleSignup: Auth;
  installStockItem: RepairOrderItem;
  login: Auth;
  refreshToken: Token;
  removeRepairOrderItem: RepairOrderItem;
  reserveStockItem: StockItem;
  syncNbuRates: Array<ExchangeRate>;
  unreserveStockItem: StockItem;
  updateRepairOrder: RepairOrder;
  updateUser: User;
};


export type MutationAddServiceToRepairArgs = {
  data: AddServiceToRepairInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCreateCurrencyArgs = {
  data: CreateCurrencyInput;
};


export type MutationCreateExchangeRateArgs = {
  data: CreateExchangeRateInput;
};


export type MutationCreateIncomingInvoiceArgs = {
  data: CreateIncomingInvoiceInput;
};


export type MutationCreateOfficeArgs = {
  data: CreateOfficeInput;
};


export type MutationCreateOrganizationArgs = {
  data: CreateOrganizationInput;
};


export type MutationCreateOutgoingInvoiceArgs = {
  data: CreateOutgoingInvoiceInput;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationCreateRepairOrderArgs = {
  data: CreateRepairOrderInput;
};


export type MutationCreateServiceArgs = {
  data: CreateServiceInput;
};


export type MutationCreateSparePartArgs = {
  data: CreateSparePartInput;
};


export type MutationCreateStorageLocationArgs = {
  data: CreateStorageLocationInput;
};


export type MutationCreateSupplierArgs = {
  data: CreateSupplierInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteServiceArgs = {
  id: Scalars['String']['input'];
};


export type MutationFirstUserSignupArgs = {
  data: FirstUserSignupInput;
};


export type MutationGoogleLoginArgs = {
  data: GoogleLoginInput;
};


export type MutationGoogleSignupArgs = {
  data: GoogleSignupInput;
};


export type MutationInstallStockItemArgs = {
  data: InstallStockItemInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['JWT']['input'];
};


export type MutationRemoveRepairOrderItemArgs = {
  data: RemoveRepairOrderItemInput;
};


export type MutationReserveStockItemArgs = {
  data: ReserveStockItemInput;
};


export type MutationUnreserveStockItemArgs = {
  data: UnreserveStockItemInput;
};


export type MutationUpdateRepairOrderArgs = {
  data: UpdateRepairOrderInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Office = {
  __typename?: 'Office';
  address?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
  organizationId: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
  users?: Maybe<Array<User>>;
};

/** Possible directions in which to order a list of items when provided an `orderBy` argument. */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Organization = {
  __typename?: 'Organization';
  address?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  offices?: Maybe<Array<Office>>;
  phone?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type OutgoingInvoice = {
  __typename?: 'OutgoingInvoice';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  dateIssued: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  invoiceNumber: Scalars['String']['output'];
  issuedBy: User;
  issuedById: Scalars['String']['output'];
  items?: Maybe<Array<OutgoingInvoiceItem>>;
  reason: OutgoingReason;
  repairOrder?: Maybe<RepairOrder>;
  repairOrderId?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type OutgoingInvoiceItem = {
  __typename?: 'OutgoingInvoiceItem';
  costAtSale?: Maybe<Scalars['Float']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  outgoingInvoice: OutgoingInvoice;
  outgoingInvoiceId: Scalars['String']['output'];
  salePrice: Scalars['Float']['output'];
  stockItem: StockItem;
  stockItemId: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** Reason for outgoing invoice */
export enum OutgoingReason {
  RepairUsage = 'REPAIR_USAGE',
  Sale = 'SALE',
  Writeoff = 'WRITEOFF'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges?: Maybe<Array<PostEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String']['output'];
  node: Post;
};

export type PostOrder = {
  direction: OrderDirection;
  field: PostOrderField;
};

/** Properties by which post connections can be ordered. */
export enum PostOrderField {
  Content = 'content',
  CreatedAt = 'createdAt',
  Id = 'id',
  Published = 'published',
  Title = 'title',
  UpdatedAt = 'updatedAt'
}

export type ProfitReport = {
  __typename?: 'ProfitReport';
  endDate: Scalars['DateTime']['output'];
  grossProfit: Scalars['Float']['output'];
  startDate: Scalars['DateTime']['output'];
  totalCost: Scalars['Float']['output'];
  totalRevenue: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  currencies: Array<Currency>;
  exchangeRates: Array<ExchangeRate>;
  hello: Scalars['String']['output'];
  helloWorld: Scalars['String']['output'];
  incomingInvoice: IncomingInvoice;
  incomingInvoices: Array<IncomingInvoice>;
  me: User;
  office: Office;
  offices: Array<Office>;
  organization: Organization;
  organizations: Array<Organization>;
  outgoingInvoice: OutgoingInvoice;
  outgoingInvoices: Array<OutgoingInvoice>;
  post: Post;
  profitReport: ProfitReport;
  publishedPosts: PostConnection;
  repairOrder: RepairOrder;
  repairOrders: Array<RepairOrder>;
  services: Array<Service>;
  sparePart: SparePart;
  spareParts: Array<SparePart>;
  stockItemBySerial?: Maybe<StockItem>;
  stockItems: Array<StockItem>;
  storageLocations: Array<StorageLocation>;
  suppliers: Array<Supplier>;
  supportedCurrencies: Array<SupportedCurrency>;
  userPosts: Array<Post>;
  users: Array<User>;
};


export type QueryExchangeRatesArgs = {
  currencyId?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryHelloArgs = {
  name: Scalars['String']['input'];
};


export type QueryIncomingInvoiceArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficeArgs = {
  id: Scalars['String']['input'];
};


export type QueryOfficesArgs = {
  organizationId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrganizationArgs = {
  id: Scalars['String']['input'];
};


export type QueryOutgoingInvoiceArgs = {
  id: Scalars['String']['input'];
};


export type QueryProfitReportArgs = {
  endDate: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
};


export type QueryPublishedPostsArgs = {
  orderBy?: InputMaybe<PostOrder>;
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRepairOrderArgs = {
  id: Scalars['String']['input'];
};


export type QuerySparePartArgs = {
  id: Scalars['String']['input'];
};


export type QueryStockItemBySerialArgs = {
  serial: Scalars['String']['input'];
};


export type QueryStockItemsArgs = {
  sparePartId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStorageLocationsArgs = {
  officeId?: InputMaybe<Scalars['String']['input']>;
};

export type RemoveRepairOrderItemInput = {
  id: Scalars['String']['input'];
};

export type RepairOrder = {
  __typename?: 'RepairOrder';
  agreedPrice?: Maybe<Scalars['Float']['output']>;
  assignedMaster: User;
  assignedMasterId: Scalars['String']['output'];
  client?: Maybe<User>;
  clientId?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  deviceName: Scalars['String']['output'];
  deviceSerial?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  problemDescription?: Maybe<Scalars['String']['output']>;
  repairOrderItems?: Maybe<Array<RepairOrderItem>>;
  reservedStockItems?: Maybe<Array<StockItem>>;
  status: RepairStatus;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type RepairOrderItem = {
  __typename?: 'RepairOrderItem';
  costAtSale?: Maybe<Scalars['Float']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  customServiceName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  office: Office;
  officeId: Scalars['String']['output'];
  performers: Array<User>;
  price?: Maybe<Scalars['Float']['output']>;
  quantity: Scalars['Int']['output'];
  repairOrder: RepairOrder;
  repairOrderId: Scalars['String']['output'];
  service?: Maybe<Service>;
  serviceId?: Maybe<Scalars['String']['output']>;
  sparePart?: Maybe<SparePart>;
  sparePartId?: Maybe<Scalars['String']['output']>;
  stockItem?: Maybe<StockItem>;
  stockItemId?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** Status of a repair order */
export enum RepairStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  ReadyToCollect = 'READY_TO_COLLECT',
  WaitingForParts = 'WAITING_FOR_PARTS'
}

export type ReserveStockItemInput = {
  repairOrderId: Scalars['String']['input'];
  stockItemSerial: Scalars['String']['input'];
};

/** User role */
export enum Role {
  Admin = 'ADMIN',
  Client = 'CLIENT',
  Manager = 'MANAGER',
  Master = 'MASTER',
  User = 'USER'
}

export type Service = {
  __typename?: 'Service';
  cost?: Maybe<Scalars['Float']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type SparePart = {
  __typename?: 'SparePart';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  manufacturer?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  priceCustom1?: Maybe<Scalars['Float']['output']>;
  priceCustom2?: Maybe<Scalars['Float']['output']>;
  priceRetail?: Maybe<Scalars['Float']['output']>;
  priceRetailCurrency?: Maybe<Currency>;
  priceRetailCurrencyId?: Maybe<Scalars['String']['output']>;
  priceRetailUah?: Maybe<Scalars['Float']['output']>;
  sku?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type StockItem = {
  __typename?: 'StockItem';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  repairOrderId?: Maybe<Scalars['String']['output']>;
  reservedBy?: Maybe<User>;
  reservedById?: Maybe<Scalars['String']['output']>;
  serialFactory?: Maybe<Scalars['String']['output']>;
  serialInternal?: Maybe<Scalars['String']['output']>;
  sparePart: SparePart;
  sparePartId: Scalars['String']['output'];
  status: StockItemStatus;
  storageLocation?: Maybe<StorageLocation>;
  storageLocationId?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** Status of a stock item */
export enum StockItemStatus {
  Installed = 'INSTALLED',
  InStock = 'IN_STOCK',
  Reserved = 'RESERVED',
  Sold = 'SOLD',
  WrittenOff = 'WRITTEN_OFF'
}

export type StorageLocation = {
  __typename?: 'StorageLocation';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  office: Office;
  officeId: Scalars['String']['output'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  postCreated: Post;
};

export type Supplier = {
  __typename?: 'Supplier';
  address?: Maybe<Scalars['String']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  defaultCurrency?: Maybe<Currency>;
  defaultCurrencyId?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type SupportedCurrency = {
  __typename?: 'SupportedCurrency';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['JWT']['output'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT']['output'];
};

export type UnreserveStockItemInput = {
  stockItemId: Scalars['String']['input'];
};

export type UpdateRepairOrderInput = {
  agreedPrice?: InputMaybe<Scalars['String']['input']>;
  assignedMasterId?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  deviceName?: InputMaybe<Scalars['String']['input']>;
  deviceSerial?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  problemDescription?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  firstname?: InputMaybe<Scalars['String']['input']>;
  lastname?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  additionalName?: Maybe<Scalars['String']['output']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstname?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastname?: Maybe<Scalars['String']['output']>;
  office: Office;
  officeId: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
  role: Role;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', accessToken: any, refreshToken: any, user: { __typename?: 'User', id: string, email: string, role: Role } } };

export type GoogleLoginMutationVariables = Exact<{
  data: GoogleLoginInput;
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin: { __typename?: 'Auth', accessToken: any, refreshToken: any } };

export type CreateCurrencyMutationVariables = Exact<{
  data: CreateCurrencyInput;
}>;


export type CreateCurrencyMutation = { __typename?: 'Mutation', createCurrency: { __typename?: 'Currency', id: string, code: string, name: string, symbol: string, isRetailDefault: boolean } };

export type SyncNbuRatesMutationVariables = Exact<{ [key: string]: never; }>;


export type SyncNbuRatesMutation = { __typename?: 'Mutation', syncNbuRates: Array<{ __typename?: 'ExchangeRate', id: string, rate: number, createdAt: any, currency: { __typename?: 'Currency', code: string } }> };

export type EnsureDefaultCurrenciesMutationVariables = Exact<{ [key: string]: never; }>;


export type EnsureDefaultCurrenciesMutation = { __typename?: 'Mutation', ensureDefaultCurrencies: Array<{ __typename?: 'Currency', id: string, code: string, name: string, symbol: string, isRetailDefault: boolean }> };

export type CreateRepairOrderMutationVariables = Exact<{
  data: CreateRepairOrderInput;
}>;


export type CreateRepairOrderMutation = { __typename?: 'Mutation', createRepairOrder: { __typename?: 'RepairOrder', id: string, deviceName: string, status: RepairStatus } };

export type UpdateRepairOrderMutationVariables = Exact<{
  data: UpdateRepairOrderInput;
}>;


export type UpdateRepairOrderMutation = { __typename?: 'Mutation', updateRepairOrder: { __typename?: 'RepairOrder', id: string, status: RepairStatus, agreedPrice?: number | null } };

export type ReserveStockItemMutationVariables = Exact<{
  data: ReserveStockItemInput;
}>;


export type ReserveStockItemMutation = { __typename?: 'Mutation', reserveStockItem: { __typename?: 'StockItem', id: string, status: StockItemStatus } };

export type UnreserveStockItemMutationVariables = Exact<{
  data: UnreserveStockItemInput;
}>;


export type UnreserveStockItemMutation = { __typename?: 'Mutation', unreserveStockItem: { __typename?: 'StockItem', id: string, status: StockItemStatus } };

export type InstallStockItemMutationVariables = Exact<{
  data: InstallStockItemInput;
}>;


export type InstallStockItemMutation = { __typename?: 'Mutation', installStockItem: { __typename?: 'RepairOrderItem', id: string, price?: number | null } };

export type AddServiceToRepairMutationVariables = Exact<{
  data: AddServiceToRepairInput;
}>;


export type AddServiceToRepairMutation = { __typename?: 'Mutation', addServiceToRepair: { __typename?: 'RepairOrderItem', id: string, price?: number | null } };

export type RemoveRepairOrderItemMutationVariables = Exact<{
  data: RemoveRepairOrderItemInput;
}>;


export type RemoveRepairOrderItemMutation = { __typename?: 'Mutation', removeRepairOrderItem: { __typename?: 'RepairOrderItem', id: string } };

export type CreateServiceMutationVariables = Exact<{
  data: CreateServiceInput;
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'Service', id: string, name: string } };

export type DeleteServiceMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteService: { __typename?: 'Service', id: string } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, firstname?: string | null, lastname?: string | null, role: Role } };

export type ProfitReportQueryVariables = Exact<{
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;


export type ProfitReportQuery = { __typename?: 'Query', profitReport: { __typename?: 'ProfitReport', totalRevenue: number, totalCost: number, grossProfit: number } };

export type CurrenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrenciesQuery = { __typename?: 'Query', currencies: Array<{ __typename?: 'Currency', id: string, code: string, symbol: string, name: string, isRetailDefault: boolean, latestRate?: { __typename?: 'ExchangeRate', id: string, rate: number, createdAt: any } | null }> };

export type SupportedCurrenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type SupportedCurrenciesQuery = { __typename?: 'Query', supportedCurrencies: Array<{ __typename?: 'SupportedCurrency', code: string, symbol: string, name: string }> };

export type ExchangeRatesQueryVariables = Exact<{
  currencyId?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ExchangeRatesQuery = { __typename?: 'Query', exchangeRates: Array<{ __typename?: 'ExchangeRate', id: string, rate: number, effectiveDate: any, currency: { __typename?: 'Currency', code: string } }> };

export type SparePartsQueryVariables = Exact<{ [key: string]: never; }>;


export type SparePartsQuery = { __typename?: 'Query', spareParts: Array<{ __typename?: 'SparePart', id: string, name: string, sku?: string | null, manufacturer?: string | null, description?: string | null, priceRetail?: number | null, priceRetailCurrency?: { __typename?: 'Currency', id: string, code: string, symbol: string } | null }> };

export type StockItemsQueryVariables = Exact<{
  sparePartId?: InputMaybe<Scalars['String']['input']>;
}>;


export type StockItemsQuery = { __typename?: 'Query', stockItems: Array<{ __typename?: 'StockItem', id: string, serialInternal?: string | null, serialFactory?: string | null, status: StockItemStatus, sparePart: { __typename?: 'SparePart', id: string, name: string }, storageLocation?: { __typename?: 'StorageLocation', id: string, name: string } | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstname?: string | null, lastname?: string | null, role: Role, office: { __typename?: 'Office', id: string, name: string } } };

export type RepairOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type RepairOrdersQuery = { __typename?: 'Query', repairOrders: Array<{ __typename?: 'RepairOrder', id: string, createdAt: any, deviceName: string, deviceSerial?: string | null, problemDescription?: string | null, agreedPrice?: number | null, status: RepairStatus, client?: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, additionalName?: string | null } | null, assignedMaster: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null }, repairOrderItems?: Array<{ __typename?: 'RepairOrderItem', id: string, price?: number | null }> | null }> };

export type RepairOrderQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RepairOrderQuery = { __typename?: 'Query', repairOrder: { __typename?: 'RepairOrder', id: string, createdAt: any, deviceName: string, deviceSerial?: string | null, problemDescription?: string | null, agreedPrice?: number | null, status: RepairStatus, client?: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, additionalName?: string | null } | null, assignedMaster: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null }, repairOrderItems?: Array<{ __typename?: 'RepairOrderItem', id: string, customServiceName?: string | null, price?: number | null, quantity: number, performers: Array<{ __typename?: 'User', firstname?: string | null, lastname?: string | null }>, sparePart?: { __typename?: 'SparePart', id: string, name: string, priceRetail?: number | null, priceRetailCurrency?: { __typename?: 'Currency', symbol: string } | null } | null, service?: { __typename?: 'Service', id: string, name: string, cost?: number | null } | null, stockItem?: { __typename?: 'StockItem', id: string, serialInternal?: string | null, serialFactory?: string | null } | null }> | null, reservedStockItems?: Array<{ __typename?: 'StockItem', id: string, serialInternal?: string | null, serialFactory?: string | null, sparePart: { __typename?: 'SparePart', id: string, name: string, priceRetail?: number | null, priceRetailCurrency?: { __typename?: 'Currency', symbol: string } | null } }> | null } };

export type ServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type ServicesQuery = { __typename?: 'Query', services: Array<{ __typename?: 'Service', id: string, name: string, description?: string | null, cost?: number | null }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, firstname?: string | null, lastname?: string | null, role: Role, officeId: string }> };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GoogleLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GoogleLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GoogleLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<GoogleLoginMutation, GoogleLoginMutationVariables>;
export const CreateCurrencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCurrency"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCurrencyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCurrency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"isRetailDefault"}}]}}]}}]} as unknown as DocumentNode<CreateCurrencyMutation, CreateCurrencyMutationVariables>;
export const SyncNbuRatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncNbuRates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncNbuRates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<SyncNbuRatesMutation, SyncNbuRatesMutationVariables>;
export const EnsureDefaultCurrenciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnsureDefaultCurrencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ensureDefaultCurrencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"isRetailDefault"}}]}}]}}]} as unknown as DocumentNode<EnsureDefaultCurrenciesMutation, EnsureDefaultCurrenciesMutationVariables>;
export const CreateRepairOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRepairOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRepairOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRepairOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"deviceName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateRepairOrderMutation, CreateRepairOrderMutationVariables>;
export const UpdateRepairOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRepairOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRepairOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRepairOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"agreedPrice"}}]}}]}}]} as unknown as DocumentNode<UpdateRepairOrderMutation, UpdateRepairOrderMutationVariables>;
export const ReserveStockItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReserveStockItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReserveStockItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reserveStockItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ReserveStockItemMutation, ReserveStockItemMutationVariables>;
export const UnreserveStockItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnreserveStockItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnreserveStockItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unreserveStockItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UnreserveStockItemMutation, UnreserveStockItemMutationVariables>;
export const InstallStockItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InstallStockItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InstallStockItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"installStockItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<InstallStockItemMutation, InstallStockItemMutationVariables>;
export const AddServiceToRepairDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddServiceToRepair"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddServiceToRepairInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addServiceToRepair"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<AddServiceToRepairMutation, AddServiceToRepairMutationVariables>;
export const RemoveRepairOrderItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveRepairOrderItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveRepairOrderItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRepairOrderItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveRepairOrderItemMutation, RemoveRepairOrderItemMutationVariables>;
export const CreateServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateServiceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateServiceMutation, CreateServiceMutationVariables>;
export const DeleteServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteServiceMutation, DeleteServiceMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const ProfitReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfitReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profitReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalRevenue"}},{"kind":"Field","name":{"kind":"Name","value":"totalCost"}},{"kind":"Field","name":{"kind":"Name","value":"grossProfit"}}]}}]}}]} as unknown as DocumentNode<ProfitReportQuery, ProfitReportQueryVariables>;
export const CurrenciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Currencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isRetailDefault"}},{"kind":"Field","name":{"kind":"Name","value":"latestRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<CurrenciesQuery, CurrenciesQueryVariables>;
export const SupportedCurrenciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SupportedCurrencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"supportedCurrencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SupportedCurrenciesQuery, SupportedCurrenciesQueryVariables>;
export const ExchangeRatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExchangeRates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currencyId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exchangeRates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"currencyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currencyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"effectiveDate"}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<ExchangeRatesQuery, ExchangeRatesQueryVariables>;
export const SparePartsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SpareParts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spareParts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"priceRetail"}},{"kind":"Field","name":{"kind":"Name","value":"priceRetailCurrency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]}}]} as unknown as DocumentNode<SparePartsQuery, SparePartsQueryVariables>;
export const StockItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StockItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sparePartId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stockItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sparePartId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sparePartId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"serialInternal"}},{"kind":"Field","name":{"kind":"Name","value":"serialFactory"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"sparePart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<StockItemsQuery, StockItemsQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"office"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const RepairOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RepairOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"additionalName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deviceName"}},{"kind":"Field","name":{"kind":"Name","value":"deviceSerial"}},{"kind":"Field","name":{"kind":"Name","value":"problemDescription"}},{"kind":"Field","name":{"kind":"Name","value":"agreedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedMaster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repairOrderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]} as unknown as DocumentNode<RepairOrdersQuery, RepairOrdersQueryVariables>;
export const RepairOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RepairOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repairOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"client"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"additionalName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deviceName"}},{"kind":"Field","name":{"kind":"Name","value":"deviceSerial"}},{"kind":"Field","name":{"kind":"Name","value":"problemDescription"}},{"kind":"Field","name":{"kind":"Name","value":"agreedPrice"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedMaster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repairOrderItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"customServiceName"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"performers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sparePart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"priceRetail"}},{"kind":"Field","name":{"kind":"Name","value":"priceRetailCurrency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stockItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"serialInternal"}},{"kind":"Field","name":{"kind":"Name","value":"serialFactory"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"reservedStockItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"serialInternal"}},{"kind":"Field","name":{"kind":"Name","value":"serialFactory"}},{"kind":"Field","name":{"kind":"Name","value":"sparePart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"priceRetail"}},{"kind":"Field","name":{"kind":"Name","value":"priceRetailCurrency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RepairOrderQuery, RepairOrderQueryVariables>;
export const ServicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Services"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"services"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}}]}}]}}]} as unknown as DocumentNode<ServicesQuery, ServicesQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"officeId"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;