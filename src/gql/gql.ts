/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    refreshToken\n    user {\n      id\n      email\n      role\n    }\n  }\n}\n\nmutation GoogleLogin($data: GoogleLoginInput!) {\n  googleLogin(data: $data) {\n    accessToken\n    refreshToken\n  }\n}": types.LoginDocument,
    "mutation CreateRepairOrder($data: CreateRepairOrderInput!) {\n  createRepairOrder(data: $data) {\n    id\n    deviceName\n    status\n  }\n}\n\nmutation UpdateRepairOrder($data: UpdateRepairOrderInput!) {\n  updateRepairOrder(data: $data) {\n    id\n    status\n    agreedPrice\n  }\n}\n\nmutation ReserveStockItem($data: ReserveStockItemInput!) {\n  reserveStockItem(data: $data) {\n    id\n    status\n  }\n}\n\nmutation UnreserveStockItem($data: UnreserveStockItemInput!) {\n  unreserveStockItem(data: $data) {\n    id\n    status\n  }\n}\n\nmutation InstallStockItem($data: InstallStockItemInput!) {\n  installStockItem(data: $data) {\n    id\n    price\n  }\n}\n\nmutation AddServiceToRepair($data: AddServiceToRepairInput!) {\n  addServiceToRepair(data: $data) {\n    id\n    price\n  }\n}\n\nmutation RemoveRepairOrderItem($data: RemoveRepairOrderItemInput!) {\n  removeRepairOrderItem(data: $data) {\n    id\n  }\n}": types.CreateRepairOrderDocument,
    "mutation CreateService($data: CreateServiceInput!) {\n  createService(data: $data) {\n    id\n    name\n  }\n}\n\nmutation DeleteService($id: String!) {\n  deleteService(id: $id) {\n    id\n  }\n}": types.CreateServiceDocument,
    "mutation CreateUser($data: CreateUserInput!) {\n  createUser(data: $data) {\n    id\n    email\n    firstname\n    lastname\n    role\n  }\n}": types.CreateUserDocument,
    "query ProfitReport($startDate: DateTime!, $endDate: DateTime!) {\n  profitReport(startDate: $startDate, endDate: $endDate) {\n    totalRevenue\n    totalCost\n    grossProfit\n  }\n}": types.ProfitReportDocument,
    "query Currencies {\n  currencies {\n    id\n    code\n    symbol\n    name\n    isRetailDefault\n  }\n}\n\nquery ExchangeRates($currencyId: String) {\n  exchangeRates(currencyId: $currencyId) {\n    id\n    rate\n    effectiveDate\n    currency {\n      code\n    }\n  }\n}": types.CurrenciesDocument,
    "query SpareParts {\n  spareParts {\n    id\n    name\n    sku\n    manufacturer\n    description\n    priceRetail\n    priceRetailCurrency {\n      id\n      code\n      symbol\n    }\n  }\n}\n\nquery StockItems($sparePartId: String) {\n  stockItems(sparePartId: $sparePartId) {\n    id\n    serialInternal\n    serialFactory\n    status\n    sparePart {\n      id\n      name\n    }\n    storageLocation {\n      id\n      name\n    }\n  }\n}": types.SparePartsDocument,
    "query Me {\n  me {\n    id\n    email\n    firstname\n    lastname\n    role\n    office {\n      id\n      name\n    }\n  }\n}": types.MeDocument,
    "query RepairOrders {\n  repairOrders {\n    id\n    createdAt\n    client {\n      id\n      firstname\n      lastname\n      additionalName\n    }\n    deviceName\n    deviceSerial\n    problemDescription\n    agreedPrice\n    status\n    assignedMaster {\n      id\n      firstname\n      lastname\n    }\n    repairOrderItems {\n      id\n      price\n    }\n  }\n}\n\nquery RepairOrder($id: String!) {\n  repairOrder(id: $id) {\n    id\n    createdAt\n    client {\n      id\n      firstname\n      lastname\n      additionalName\n    }\n    deviceName\n    deviceSerial\n    problemDescription\n    agreedPrice\n    status\n    assignedMaster {\n      id\n      firstname\n      lastname\n    }\n    repairOrderItems {\n      id\n      customServiceName\n      price\n      quantity\n      performers {\n        firstname\n        lastname\n      }\n      sparePart {\n        id\n        name\n        priceRetail\n        priceRetailCurrency {\n          symbol\n        }\n      }\n      service {\n        id\n        name\n        cost\n      }\n      stockItem {\n        id\n        serialInternal\n        serialFactory\n      }\n    }\n    reservedStockItems {\n      id\n      serialInternal\n      serialFactory\n      sparePart {\n        id\n        name\n        priceRetail\n        priceRetailCurrency {\n          symbol\n        }\n      }\n    }\n  }\n}": types.RepairOrdersDocument,
    "query Services {\n  services {\n    id\n    name\n    description\n    cost\n  }\n}": types.ServicesDocument,
    "query Users {\n  users {\n    id\n    email\n    firstname\n    lastname\n    role\n    officeId\n  }\n}": types.UsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    refreshToken\n    user {\n      id\n      email\n      role\n    }\n  }\n}\n\nmutation GoogleLogin($data: GoogleLoginInput!) {\n  googleLogin(data: $data) {\n    accessToken\n    refreshToken\n  }\n}"): (typeof documents)["mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    accessToken\n    refreshToken\n    user {\n      id\n      email\n      role\n    }\n  }\n}\n\nmutation GoogleLogin($data: GoogleLoginInput!) {\n  googleLogin(data: $data) {\n    accessToken\n    refreshToken\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateRepairOrder($data: CreateRepairOrderInput!) {\n  createRepairOrder(data: $data) {\n    id\n    deviceName\n    status\n  }\n}\n\nmutation UpdateRepairOrder($data: UpdateRepairOrderInput!) {\n  updateRepairOrder(data: $data) {\n    id\n    status\n    agreedPrice\n  }\n}\n\nmutation ReserveStockItem($data: ReserveStockItemInput!) {\n  reserveStockItem(data: $data) {\n    id\n    status\n  }\n}\n\nmutation UnreserveStockItem($data: UnreserveStockItemInput!) {\n  unreserveStockItem(data: $data) {\n    id\n    status\n  }\n}\n\nmutation InstallStockItem($data: InstallStockItemInput!) {\n  installStockItem(data: $data) {\n    id\n    price\n  }\n}\n\nmutation AddServiceToRepair($data: AddServiceToRepairInput!) {\n  addServiceToRepair(data: $data) {\n    id\n    price\n  }\n}\n\nmutation RemoveRepairOrderItem($data: RemoveRepairOrderItemInput!) {\n  removeRepairOrderItem(data: $data) {\n    id\n  }\n}"): (typeof documents)["mutation CreateRepairOrder($data: CreateRepairOrderInput!) {\n  createRepairOrder(data: $data) {\n    id\n    deviceName\n    status\n  }\n}\n\nmutation UpdateRepairOrder($data: UpdateRepairOrderInput!) {\n  updateRepairOrder(data: $data) {\n    id\n    status\n    agreedPrice\n  }\n}\n\nmutation ReserveStockItem($data: ReserveStockItemInput!) {\n  reserveStockItem(data: $data) {\n    id\n    status\n  }\n}\n\nmutation UnreserveStockItem($data: UnreserveStockItemInput!) {\n  unreserveStockItem(data: $data) {\n    id\n    status\n  }\n}\n\nmutation InstallStockItem($data: InstallStockItemInput!) {\n  installStockItem(data: $data) {\n    id\n    price\n  }\n}\n\nmutation AddServiceToRepair($data: AddServiceToRepairInput!) {\n  addServiceToRepair(data: $data) {\n    id\n    price\n  }\n}\n\nmutation RemoveRepairOrderItem($data: RemoveRepairOrderItemInput!) {\n  removeRepairOrderItem(data: $data) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateService($data: CreateServiceInput!) {\n  createService(data: $data) {\n    id\n    name\n  }\n}\n\nmutation DeleteService($id: String!) {\n  deleteService(id: $id) {\n    id\n  }\n}"): (typeof documents)["mutation CreateService($data: CreateServiceInput!) {\n  createService(data: $data) {\n    id\n    name\n  }\n}\n\nmutation DeleteService($id: String!) {\n  deleteService(id: $id) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateUser($data: CreateUserInput!) {\n  createUser(data: $data) {\n    id\n    email\n    firstname\n    lastname\n    role\n  }\n}"): (typeof documents)["mutation CreateUser($data: CreateUserInput!) {\n  createUser(data: $data) {\n    id\n    email\n    firstname\n    lastname\n    role\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProfitReport($startDate: DateTime!, $endDate: DateTime!) {\n  profitReport(startDate: $startDate, endDate: $endDate) {\n    totalRevenue\n    totalCost\n    grossProfit\n  }\n}"): (typeof documents)["query ProfitReport($startDate: DateTime!, $endDate: DateTime!) {\n  profitReport(startDate: $startDate, endDate: $endDate) {\n    totalRevenue\n    totalCost\n    grossProfit\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Currencies {\n  currencies {\n    id\n    code\n    symbol\n    name\n    isRetailDefault\n  }\n}\n\nquery ExchangeRates($currencyId: String) {\n  exchangeRates(currencyId: $currencyId) {\n    id\n    rate\n    effectiveDate\n    currency {\n      code\n    }\n  }\n}"): (typeof documents)["query Currencies {\n  currencies {\n    id\n    code\n    symbol\n    name\n    isRetailDefault\n  }\n}\n\nquery ExchangeRates($currencyId: String) {\n  exchangeRates(currencyId: $currencyId) {\n    id\n    rate\n    effectiveDate\n    currency {\n      code\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SpareParts {\n  spareParts {\n    id\n    name\n    sku\n    manufacturer\n    description\n    priceRetail\n    priceRetailCurrency {\n      id\n      code\n      symbol\n    }\n  }\n}\n\nquery StockItems($sparePartId: String) {\n  stockItems(sparePartId: $sparePartId) {\n    id\n    serialInternal\n    serialFactory\n    status\n    sparePart {\n      id\n      name\n    }\n    storageLocation {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query SpareParts {\n  spareParts {\n    id\n    name\n    sku\n    manufacturer\n    description\n    priceRetail\n    priceRetailCurrency {\n      id\n      code\n      symbol\n    }\n  }\n}\n\nquery StockItems($sparePartId: String) {\n  stockItems(sparePartId: $sparePartId) {\n    id\n    serialInternal\n    serialFactory\n    status\n    sparePart {\n      id\n      name\n    }\n    storageLocation {\n      id\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    id\n    email\n    firstname\n    lastname\n    role\n    office {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    email\n    firstname\n    lastname\n    role\n    office {\n      id\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query RepairOrders {\n  repairOrders {\n    id\n    createdAt\n    client {\n      id\n      firstname\n      lastname\n      additionalName\n    }\n    deviceName\n    deviceSerial\n    problemDescription\n    agreedPrice\n    status\n    assignedMaster {\n      id\n      firstname\n      lastname\n    }\n    repairOrderItems {\n      id\n      price\n    }\n  }\n}\n\nquery RepairOrder($id: String!) {\n  repairOrder(id: $id) {\n    id\n    createdAt\n    client {\n      id\n      firstname\n      lastname\n      additionalName\n    }\n    deviceName\n    deviceSerial\n    problemDescription\n    agreedPrice\n    status\n    assignedMaster {\n      id\n      firstname\n      lastname\n    }\n    repairOrderItems {\n      id\n      customServiceName\n      price\n      quantity\n      performers {\n        firstname\n        lastname\n      }\n      sparePart {\n        id\n        name\n        priceRetail\n        priceRetailCurrency {\n          symbol\n        }\n      }\n      service {\n        id\n        name\n        cost\n      }\n      stockItem {\n        id\n        serialInternal\n        serialFactory\n      }\n    }\n    reservedStockItems {\n      id\n      serialInternal\n      serialFactory\n      sparePart {\n        id\n        name\n        priceRetail\n        priceRetailCurrency {\n          symbol\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query RepairOrders {\n  repairOrders {\n    id\n    createdAt\n    client {\n      id\n      firstname\n      lastname\n      additionalName\n    }\n    deviceName\n    deviceSerial\n    problemDescription\n    agreedPrice\n    status\n    assignedMaster {\n      id\n      firstname\n      lastname\n    }\n    repairOrderItems {\n      id\n      price\n    }\n  }\n}\n\nquery RepairOrder($id: String!) {\n  repairOrder(id: $id) {\n    id\n    createdAt\n    client {\n      id\n      firstname\n      lastname\n      additionalName\n    }\n    deviceName\n    deviceSerial\n    problemDescription\n    agreedPrice\n    status\n    assignedMaster {\n      id\n      firstname\n      lastname\n    }\n    repairOrderItems {\n      id\n      customServiceName\n      price\n      quantity\n      performers {\n        firstname\n        lastname\n      }\n      sparePart {\n        id\n        name\n        priceRetail\n        priceRetailCurrency {\n          symbol\n        }\n      }\n      service {\n        id\n        name\n        cost\n      }\n      stockItem {\n        id\n        serialInternal\n        serialFactory\n      }\n    }\n    reservedStockItems {\n      id\n      serialInternal\n      serialFactory\n      sparePart {\n        id\n        name\n        priceRetail\n        priceRetailCurrency {\n          symbol\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Services {\n  services {\n    id\n    name\n    description\n    cost\n  }\n}"): (typeof documents)["query Services {\n  services {\n    id\n    name\n    description\n    cost\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Users {\n  users {\n    id\n    email\n    firstname\n    lastname\n    role\n    officeId\n  }\n}"): (typeof documents)["query Users {\n  users {\n    id\n    email\n    firstname\n    lastname\n    role\n    officeId\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;