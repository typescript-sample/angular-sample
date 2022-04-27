import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyProfileFormComponent } from "./my-profile-form.component";
import { MySettingsFormComponent } from "./my-settings-form.component";

@Component({
    selector: 'app-my-profile-module',
    template: '<router-outlet></router-outlet>'
})
export class MyProfileComponent {
    constructor() { }
}

const myProfileRoutes: Routes = [
    {
        path: '',
        component: MyProfileComponent,
        children: [
            { path: '', component:MyProfileFormComponent },
            { path: 'settings', component: MySettingsFormComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(myProfileRoutes)
    ],
    declarations: [

    ],
    exports: [
        RouterModule,
    ]
})
export class MyProfileRoutes {

}