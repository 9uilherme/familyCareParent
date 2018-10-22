import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'principal',
        loadChildren: './principal/principal.module#PrincipalModule'
    },
    {
        path: '**', 
        component: NotFoundComponent
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes,{useHash:true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{}