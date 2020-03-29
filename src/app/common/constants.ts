import { environment } from 'src/environments/environment';

export const TO_DO_LISTS_ENDPOINT_URL = environment.backendUrl + '/api/to-do-lists/';
export const TO_DOS_ENDPOINT_URL = environment.backendUrl + '/api/to-dos/'
export const PLACEHOLDER_ADD_NEW_TO_DO_LIST = "Neue To-Do-Liste anlegen";
export const PLACEHOLDER_ADD_NEW_TO_DO = "Neues To-Do hinzufügen";

export const PRIORIZATION_DEBOUNCE_TIME_IN_MILLIS = 3000;
export const SPINNER_DEBOUNCE_TIME_IN_MILLIS = 50;
export const ERROR_DISPLAY_TIME_IN_MILLIS = 5000;

