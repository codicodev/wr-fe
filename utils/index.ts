import type { FormError } from '#ui/types';

export const validateEmail = (email: string) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

export const validatePhoneNumber = (phoneNumber: string) => {
	return phoneNumber.match(
		/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
	);
};

export const validateUrl = (url: string) => {
	const pattern =
		/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

	return url.match(pattern);
};

export const checkEndDate = (...args: (Date | string)[]) => {
	let [a, b] = args;

	if (typeof a === 'string') a = new Date(a);
	if (typeof b === 'string') b = new Date(b);

	return a > b;
};

export const checkAverageRating = (n: number) => {
	return n >= 1 && n <= 5;
};

export const validatePrice = (price: string) => {
	return price.match(/^\d+\.\d\d$/);
};

export const validateTravelForm = (state: Travel): FormError[] => {
	const errors = [];
	if (!state.name) errors.push({ path: 'name', message: 'Required' });
	if (!state.description)
		errors.push({ path: 'description', message: 'Required' });
	if (!state.image || !validateUrl(state.image))
		errors.push({
			path: 'image',
			message: 'Required. It has to be a valid URL',
		});
	if (!state.start_date)
		errors.push({ path: 'start_date', message: 'Required' });
	if (!state.end_date || !checkEndDate(state.end_date, state.start_date))
		errors.push({
			path: 'end_date',
			message: 'Required. End date must be greater than start date',
		});
	if (!state.price || !validatePrice(state.price.toString()))
		errors.push({
			path: 'price',
			message: 'Required. Price is required and should be like 120.00',
		});
	if (
		!state.average_user_rating ||
		!checkAverageRating(state.average_user_rating)
	)
		errors.push({
			path: 'average_user_rating',
			message: 'Required. Average user rating min 1 max 5',
		});

	return errors;
};
