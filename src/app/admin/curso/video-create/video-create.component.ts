import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

import { Videogaleria } from 'src/app/models/videogaleria.model';
import { VideogaleriaService } from 'src/app/services/videgaleria.service';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.css']
})
export class VideoCreateComponent implements OnInit {


  public videoForm: FormGroup;
  public usuario: Usuario;
  public curso: Curso;
  public galeriavideo;
  public select_curso;

  pageTitle: string;
  public titulo;
  public video;
  public id;

  public videoSeleccionado: Videogaleria;

  constructor(
    private fb: FormBuilder,
    private videogaleriaService: VideogaleriaService,
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private _sanitizer: DomSanitizer,
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.baseUrl;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);


    this.videoForm = this.fb.group({
      titulo: ['',Validators.required],
      video: ['',Validators.required],
      curso: ['',Validators.required],
    })

    this.activatedRoute.params.subscribe( ({id}) => this.loadCursos(id));

    if(this.videoSeleccionado){
      //actualizar
      this.pageTitle = 'Create Video';

    }else{
      //crear
      this.pageTitle = 'Edit Video';
    }

  }




  loadCursos(id: string){
    this.cursoService.getCursoById(id).subscribe(
      response =>{
        this.curso = response;
        console.log(this.curso);
      },
      error=>{

      }
    );

  }


  createCurso(videoForm){

    // const {titulo, curso, video } = this.videoForm.value;

    if(videoForm.valid){
      this.videogaleriaService.create({titulo: this.titulo, video: this.video, curso:this.curso._id,})
      .subscribe(
        response=>{
          this.video = '';
          this.titulo = '';
          Swal.fire('Creado', `creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/curso/curso-video/${this.curso._id}`);
        },
        )

    }

  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getVideoIframe(url) {
    var video, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
}


}
