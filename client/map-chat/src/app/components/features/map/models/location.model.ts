export interface UserGeolocationCoordinates {
    latitude: number;
    longitude: number;
    accuracy: number;
}

export interface UserGeolocationPosition {
    coords: UserGeolocationCoordinates;
    timestamp: number;
};