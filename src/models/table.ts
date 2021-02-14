import { User } from "./user";

export class Table {
    createdOn!: number;
    users!: { [key: string]: User };
    maskAll: boolean = true;
}
