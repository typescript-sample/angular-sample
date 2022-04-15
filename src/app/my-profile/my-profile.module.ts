import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyProfileComponent, ProfileRoutes } from "./my-profile.component";
import { MySettingsFormComponent } from "./my-settings-form.component";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ProfileRoutes,
        ReactiveFormsModule
    ],
    declarations:[
        MyProfileComponent,
        MySettingsFormComponent,
    ],
    entryComponents:[],
    exports:[],
    providers:[
        // MyProfileClient,
        
    ]
})
export class ProfileModule {}