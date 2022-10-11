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


interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {


  public videoForm: FormGroup;
  public video: Videogaleria;
  public usuario: Usuario;

  pageTitle: string;

  public videoSeleccionado: Videogaleria;

  constructor(
    private fb: FormBuilder,
    private videogaleriaService: VideogaleriaService,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.baseUrl;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));

    window.scrollTo(0,0);
    this.validarFormulario();

    if(this.videoSeleccionado){
      //actualizar
      this.pageTitle = 'Create Video';

    }else{
      //crear
      this.pageTitle = 'Edit Video';
    }



  }

  validarFormulario(){
    this.videoForm = this.fb.group({
      titulo: ['',Validators.required],
      curso: ['',Validators.required],
      video: ['',Validators.required]
    })
  }


  iniciarFormulario(_id: string){

    if (_id) {
      this.pageTitle = 'Edit Video';
      this.videogaleriaService.get_video(_id).subscribe(
        res => {
          this.videoForm.patchValue({
            id: res._id,
            titulo: res.titulo,
            curso: res.curso,
            video: res.video,
          });
          this.videoSeleccionado = res;
          console.log(this.videoSeleccionado);
        }
      );
    } else {
      this.pageTitle = 'Create Video';
    }

  }





  updateCurso(){

    const {titulo, curso,video } = this.videoForm.value;

    if(this.videoSeleccionado){
      //actualizar
      const data = {
        ...this.videoForm.value,
        _id: this.videoSeleccionado._id
      }
      this.videogaleriaService.actualizarCurso(this.videoSeleccionado._id, this.videoSeleccionado).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${titulo}  actualizado correctamente`, 'success');
          console.log(this.videoSeleccionado);
        });

    }else{
      //crear
      this.videogaleriaService.create(this.videoForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${titulo} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/curso`);
      })
    }

  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
