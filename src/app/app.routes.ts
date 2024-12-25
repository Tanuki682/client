import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'Login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'server-error',
        loadComponent: () => import('./server-error/server-error.component').then(c => c.ServerErrorComponent)
    },
    {
        path: '404',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },
    {
        path: 'member',
        loadComponent: () => import('./member/member.component').then(c => c.MemberComponent)
    },
    {
        path: '**',
        pathMatch: 'full',
        loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
    },
]
