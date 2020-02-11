export interface PackageData {
    id: string
    destination: Address
    parcelTrackingStatus: PackageStatus
    customerName: string
    address: string
    city: string
    comments: string
}

export interface Address {
    city: string
    street: string
    number: string
    apartment: string
}

export enum PackageStatus {
    ready = 'מוכנה לחלוקה',
    distribution = 'בחלוקה',
    delivered = 'נמסרה'
}

export enum PackageStatusAPI {
    ready = 'ready',
    distribution = 'distribution',
    delivered = 'delivered'
}

/* export interface Person {
    firstName: string,
    lastName: string,
    id: string
} */
