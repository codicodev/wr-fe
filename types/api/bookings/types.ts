export interface BookingApi {
	id: string;
	travelId: string;
	customer: CustomerApi;
	paymentType: PaymentTypeApi;
	notes?: string;
}

export interface CustomerApi {
	id: string;
	name: string;
	email: string;
	phoneNumber: string;
	age: number;
	gender: GenderApi;
}

export type GenderApi = 'male' | 'female' | 'other';

export type PaymentTypeApi = 'credit transfer' | 'paypal' | 'revolut';
