import { IMessage } from './';

export interface IChatBoom {
    id:string;
    roomName:string;
    massage:Array<IMessage>;
    createdUserId:string;
}