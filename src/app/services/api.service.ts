import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService{
    
    baseUrl:string=`http://localhost/wedding/controller.php?`;
    constructor(private http: HttpClient){

    }
}