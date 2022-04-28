import { Component, OnInit } from "@angular/core";
import { getResource, handleError, message,  } from "uione";
import { StringMap } from "angularx";
import { MyProfileClient, UserSettings } from "./my-profile";

@Component({
    selector: 'app-settings',
    templateUrl: './my-settings-form.html',
    // providers: [MyProfileClient],

})
export class MySettingsFormComponent implements OnInit{
    constructor(private service: MyProfileClient) {
    this.resource = getResource().resource();
    }
    resource: StringMap;
    settings: UserSettings
    = {
        userId: "",
        language: "",
        dateFormat: "",
        dateTimeFormat: "",
        timeFormat: "",
        notification: false,
        searchEnginesLinksToMyProfile: false,
        emailFeedUpdates: false,
        notifyFeedUpdates: false,
        emailPostMentions: false,
        notifyPostMentions: false,
        emailCommentsOfYourPosts: false,
        notifyCommentsOfYourPosts: false,
        emailEventInvitations: false,
        notifyEventInvitations: false,
        emailWhenNewEventsAround: false,
        notifyWhenNewEventsAround: false,
        followingListPublicOnMyProfile: false,
        showMyProfileInSpacesAroundMe: false,
        showAroundMeResultsInMemberFeed: false
    }
    load(id:any){
        this.service.getMySettings(id).then(settings => {
            if (settings) {
              this.settings = settings;              
            }
          });
    }
    ngOnInit(){
        const userId = 'XU3rkqafp';
        this.load(userId);
    }
    save(e: any) {
        
        e.preventDefault();
        const userId = 'XU3rkqafp';
        this.service.saveMySettings(userId, this.settings).then((res: number) => {
            const msg = res > 0 ? this.resource.success_save_my_settings : this.resource.fail_save_my_settings;
            message(msg);
        }).catch(handleError);
    }
    
}