export class Marker {
    type: string = 'Point';
    constructor(
        public lat: number,
        public lng: number,
        public width: number,
        public height: number,
        public isOnline: boolean
    ) { }
}