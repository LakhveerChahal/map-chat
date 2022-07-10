export class Marker {
    type: string = 'Point';
    constructor(
        public id: string,
        public name: string,
        public lat: number,
        public lng: number,
        public isOnline: boolean,
        public width: number = 70,
        public height: number = 70,
    ) { }
}