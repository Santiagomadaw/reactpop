export interface IAds {
    id: string;
    createdAt: string;
    name: string;
    sale: boolean;
    price: number;
    tags: string[];
    photo: string;
}
export interface ILogin {
    email: string;
    password: string;
}