export class User {
    constructor(
        public _id: string,
        public name: string,
        public email: string,
        public img: string,
        public lat: number,
        public lng: number,
        public isOnline: boolean,
        public isFriend: boolean,
        public friendReqReceived: boolean,
        public friendReqSent: boolean
    ) { }
}

export interface UserMetaData {
    _id: string;
    friendCount: number;
    requestReceivedCount: number;
    requestSentCount: number;
}