export interface PackageData {
    packageId: string
    destination: Address
    status: PackageStatus
    receiver: Person,
    messenger: Person
}

export interface Address {
    city: string
    street: string
    number: string
    apartment: string
}

export enum PackageStatus {
    ReadyForDelivery,
    InDelivery,
    Delivered
}

export interface Person {
    firstName: string,
    lastName: string,
    id: string
}
