import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersPage } from "./users-page.component";

@Component({
    selector:'app-profile-module',
    template:'<router-outlet></router-outlet>'
})
export class ProfileComponet{
    constructor(){}
}

const profileRoutes:Routes = [
    {
        path:'',
        component:ProfileComponet,
        children:[
            {path:'',component:UsersPage}
        ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(profileRoutes),
    ],
    declarations:[],
    exports:[
        RouterModule
    ]
})
export class ProfileRoutes{}