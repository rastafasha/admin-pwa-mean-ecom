import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { BusquedasService } from '../../../services/busquedas.service';
import { Videogaleria } from '../../../models/videogaleria.model';
import { VideogaleriaService } from '../../../services/videgaleria.service';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-video-index',
  templateUrl: './video-index.component.html',
  styleUrls: ['./video-index.component.css']
})
export class VideoIndexComponent implements OnInit {

  public cursos: Curso[] =[];
  public galeriavideos: Videogaleria[]=[];
  public galeriavideo: any = {};
  public cargando: boolean = true;


  p: number = 1;
  count: number = 8;

  public msm_error;
  public _id;

  constructor(
    private videoService: VideogaleriaService,
    private cursoService: CursoService,
    private busquedaService: BusquedasService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.loadVideos();
    this.loadCursos();

    this.activatedRoute.params.subscribe(
      params=>{
        this._id = params['id'];
        this.videoService.find_by_curso(this._id).subscribe(
          res=>{
            this.galeriavideo = res;
            console.log(this.galeriavideo);
          },
          error=>{

          }
        )
      }
    );
  }


  loadVideos(){
    this.cargando = true;
    this.videoService.getVideos().subscribe(
      galeriavideos => {
        this.cargando = false;
        this.galeriavideos = galeriavideos;
        console.log(this.galeriavideos);
      }
    )

  }
  loadCursos(){
    this.cargando = true;
    this.cursoService.getCursos().subscribe(
      cursos => {
        this.cursos = cursos;
      }
    )

  }




  eliminarVideo(_id: string){
    this.videoService.eliminar(this.galeriavideo._id)
    .subscribe( resp => {
      this.loadVideos();
      Swal.fire('Borrado', this.galeriavideo.titulo, 'success')
    })

  }

  buscar(termino: string){

    // if(termino.length === 0){
    //   return this.loadCategorias();
    // }

    // this.busquedaService.buscar('cursos', termino)
    // .subscribe( resultados => {
    //   resultados;
    // })
  }




  desactivar(id){
    this.videoService.desactivar(id).subscribe(
      response=>{
        $('#desactivar-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.loadCursos();
      },
      error=>{
        this.msm_error = 'No se pudo desactivar el curso, vuelva a intenter.'
      }
    )
  }

  activar(id){
    this.videoService.activar(id).subscribe(
      response=>{

        $('#activar-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.loadCursos();
      },
      error=>{


        this.msm_error = 'No se pudo activar el curso, vuelva a intenter.'
      }
    )
  }

}
