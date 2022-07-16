export class Message {
    constructor(
        public text: string,
        public author: string,
        public time: Date = new Date()
    ) { }
}