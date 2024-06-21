export interface TravelsResponse {
	travels: Travel[];
}

export interface TravelFromApi {
	id: string;
	name: string;
	description: string;
	image: string;
	price: string;
	average_user_rating: number;
	start_date: string;
	end_date: string;
}
