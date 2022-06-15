import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ProfileComponet, ProfileRoutes } from "./profile.component";
import { ProfileClient, UserClient } from "./user";
import { UsersPage } from "./users-page.component";
import { AppreciationsPage } from "./appreciations-page.component";
import { Appreciations } from "./appreciations.component";
import { AppreciationReplys } from "./appreciation.component";
import { AppreciationClient } from './appreciation';
import { PostAppreciationForm } from './post-appreciation-form.component';
import { AppreciationReplyClient } from './appreciation-reply';
import { MyProfileClient } from "../my-profile/my-profile";
import { ModalModule } from "../shared/modal/modal.module";

@NgModule({
    imports:[
        ProfileRoutes,
        CommonModule,
        FormsModule,
        PaginationModule.forRoot(),
        ReactiveFormsModule,
        ModalModule
    ],
    declarations:[
        ProfileComponet,
        UsersPage,
        AppreciationsPage,
        Appreciations,
        AppreciationReplys,
        PostAppreciationForm
    ],
    entryComponents:[],
    exports:[],
    providers:[
        ProfileClient,
        UserClient,
        AppreciationClient,
        MyProfileClient,
        AppreciationReplyClient
    ]
})
export class ProfileModule{}