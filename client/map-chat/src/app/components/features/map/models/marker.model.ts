export class Marker {
    type: string = 'Point';
    constructor(
        public lat: number,
        public lng: number,
        public isOnline: boolean,
        public width: number = 70,
        public height: number = 70,
    ) { }
}