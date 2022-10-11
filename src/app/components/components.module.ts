import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { PromptComponentComponent } from './prompt-component/prompt-component.component';



@NgModule({
  declarations: [
    ModalImagenComponent,
    PromptComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports:[
    ModalImagenComponent
  ]
})
export class ComponentsModule { }
