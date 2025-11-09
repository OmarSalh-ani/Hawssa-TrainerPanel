export interface Government {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}

export interface GovernmentsData {
  items: Government[];
}

export interface CitiesData {
  governmentId: number;
  items: City[];
}

export interface GetGovernmentsResponse {
  success: boolean;
  message: string;
  data: GovernmentsData;
}

export interface GetCitiesResponse {
  success: boolean;
  message: string;
  data: CitiesData;
}
