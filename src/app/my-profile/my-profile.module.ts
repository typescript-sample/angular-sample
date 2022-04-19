import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "../shared/modal/modal.module";
import { GeneralInfoComponent } from "./general-info.component";
import { MyProfileClient } from "./my-profile";
import { MyProfileFormComponent } from "./my-profile-form.component";
import { MyProfileComponent, ProfileRoutes } from "./my-profile.component";
import { MySettingsFormComponent } from "./my-settings-form.component";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ProfileRoutes,
        ReactiveFormsModule,
        ModalModule
    ],
    declarations:[
        MyProfileComponent,
        MySettingsFormComponent,
        MyProfileFormComponent,
        GeneralInfoComponent
    ],
    entryComponents:[],
    exports:[],
    providers:[
        MyProfileClient,
        
    ]
})
export class ProfileModule {}