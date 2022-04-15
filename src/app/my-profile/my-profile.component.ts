import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MySettingsFormComponent } from "./my-settings-form.component";

@Component({
    selector: 'app-profile-module',
    template: '<router-outlet></router-outlet>'
})
export class MyProfileComponent {
    constructor() { }
}

const profileRoutes: Routes = [
    {
        path: '',
        component: MyProfileComponent,
        children: [
            { path: '' },
            { path: 'settings', component: MySettingsFormComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(profileRoutes)
    ],
    declarations: [

    ],
    exports: [
        RouterModule,
    ]
})
export class ProfileRoutes {

}