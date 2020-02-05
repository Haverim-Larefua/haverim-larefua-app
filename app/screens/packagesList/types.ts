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
    ReadyForDelivery = 'מוכנה לחלוקה',
    InDelivery = 'בחלוקה',
    Delivered = 'נמסרה'
}

export interface Person {
    firstName: string,
    lastName: string,
    id: string
}
