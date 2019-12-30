import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaToHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey: string = environment.apiKey;
const apiUrl: string = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinePage = 0;

  constructor(private http: HttpClient) { }

  ejecutarQuery<T>( query: string ) {
    return this.http.get<T>(`${apiUrl}${query}`, { headers });
  }

  getTopHeadLines() {
    this.headLinePage++;
    console.log(this.headLinePage);
    return this.ejecutarQuery<RespuestaToHeadLines>(`/top-headlines?country=co&page=${this.headLinePage}`);
  }

  getTopHeadLinesCategory(category: string) {
    return this.ejecutarQuery<RespuestaToHeadLines>(`/top-headlines?country=co&category=${category}&page=${this.headLinePage}`);
  }
}
