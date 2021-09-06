
export interface PackageData {
    id: string
    destination: Address
    parcelTrackingStatus: PackageStatus
    customerName: string
    address: string
    city: string
    comments: string
    phone: string
    lastUpdateDate: any;
    needDelivery: boolean;
}

export interface Address {
    city: string
    street: string
    number: string
    apartment: string
}

export enum PackageStatus {
    assigned = 'מוכנה לחלוקה',
    distribution = 'בחלוקה',
    delivered = 'נמסרה',
    whileDelivering = 'מסירת חבילה'
}

export enum PackageStatusAPI {
    assigned = 'assigned',
    distribution = 'distribution',
    delivered = 'delivered',
    whileDelivering = 'whileDelivering'
}

export interface Person {
    firstName: string,
    lastName: string,
    id: string
}
