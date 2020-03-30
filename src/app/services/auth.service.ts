import { Injectable } from '@angular/core';

@Injectable()
export class AuthService{
    private token: string;

    constructor(){
        this.token = sessionStorage.getItem('weddingUserToken');
    }

    public setToken(token: string): void{
        this.token = token;
        sessionStorage.setItem('weddingUserToken', token);
    }

    public getToken(): string {
        return this.token;
    }
}