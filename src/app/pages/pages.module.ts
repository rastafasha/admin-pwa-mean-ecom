import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//modules
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';


import { AccountSettingComponent } from './account-setting/account-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { IconosService } from '../services/iconos.service';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingComponent,
    PerfilComponent,
    UsuariosComponent,
    BusquedaComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    AccountSettingComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers:[IconosService]
})
export class PagesModule { }
