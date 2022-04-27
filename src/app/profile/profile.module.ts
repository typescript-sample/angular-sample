import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ProfileComponet, ProfileRoutes } from "./profile.component";
import { ProfileClient, UserClient } from "./user";
import { UsersPage } from "./users-page.component";

@NgModule({
    imports:[
        ProfileRoutes,
        CommonModule,
        FormsModule,
        PaginationModule.forRoot(),
        ReactiveFormsModule,

    ],
    declarations:[
        ProfileComponet,
        UsersPage
    ],
    entryComponents:[],
    exports:[],
    providers:[
        ProfileClient,
        UserClient
    ]
})
export class ProfileModule{}