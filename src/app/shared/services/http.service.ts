import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GeoBlinkHTTPService {
    private host = 'http://localhost:4001/';
    private setHeaders(): Headers {
        let headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        return new Headers(headersConfig);
    }

    constructor( private http: Http){}

    get(path: string, params: object = {}): Observable<any>{
        return this.http.get(`${this.host}${path}`)
                        .map((res: Response) => res.json());
    }
}