import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {environment} from 'src/environments/environment';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Videogaleria } from "../models/videogaleria.model";

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class VideogaleriaService {

  constructor(
    private http : HttpClient,
  ) {
  }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }

  getVideos(){
    const url = `${base_url}/galeriavideos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, videogalerias: Videogaleria[]}) => resp.videogalerias)
      )
    }

  get_video(_id: string){
    const url = `${base_url}/galeriavideos/${_id}`;
    return this.http.get<any>(url, this.headers)
    .pipe(
      map((resp:{ok: boolean, videogaleria: Videogaleria}) => resp.videogaleria)
      );
  }

  find_by_curso(_id:string):Observable<any>{
    const url = `${base_url}/galeriavideos/galeria_curso/find/${_id}`;
    return this.http.get(url, this.headers);
  }


  create(videogaleria: Videogaleria){
    const url = `${base_url}/galeriavideos`;
    return this.http.post(url, videogaleria, this.headers);
  }

  actualizarCurso(_id:string, videogaleria: Videogaleria){
    const url = `${base_url}/galeriavideos/${videogaleria._id}`;
    return this.http.put(url, videogaleria, this.headers);
  }


  eliminar(_id:string){
    const url = `${base_url}/galeriavideos/${_id}`;
    return this.http.delete(url, this.headers);
  }

  desactivar(id:string):Observable<any>{
    const url = `${base_url}/galeriavideos/curso_admin/admin/desactivar/`+id;
    return this.http.get(url,  this.headers);
  }

  activar(id:string):Observable<any>{
    const url = `${base_url}/galeriavideos/curso_admin/admin/activar/`+id;
    return this.http.get(url,  this.headers);
  }
}
