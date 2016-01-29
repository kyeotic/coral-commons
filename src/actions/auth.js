import actionCreator from './actionCreator';

export const UPDATE_FORM_EMAIL  = 'UPDATE_FORM_EMAIL';
export const UPDATE_FORM_PASSWORD = 'UPDATE_FORM_PASSWORD';

export const updateEmail = actionCreator(UPDATE_FORM_EMAIL);
export const updatePassword = actionCreator(UPDATE_FORM_PASSWORD);