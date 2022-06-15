//   import Appreciations from "./appreciations.vue";
//   import PostAppreciationForm from "./post-appreciation-form.vue";
//   import { getMyProfileService, User } from "./user";
    import { Appreciation, AppreciationFilter, AppreciationClient } from './appreciation';
//   import { useAppreciationService } from './user/index';
    import { storage } from 'uione';
    import { navigate, SearchComponent } from "angularx";
    import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";
    import { alert, inputSearch } from "uione";
    import { getResource, UserAccount, handleError } from "uione";
    import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
    import { ProfileClient, User} from "./user";
    import { ActivatedRoute } from "@angular/router";
    import { buildId } from "angularx";
    import { ModalComponent } from "../shared/modal/modal.component";
  
  @Component({
    selector: 'app-appreciations-page',
    templateUrl: './appreciations-page.html',
    styleUrls: ['./rate.css']
  })

  export class AppreciationsPage implements OnInit{
    @ViewChild('appreciationModal') appreciationModal?: ModalComponent ;
    user: User = {} as any;
    resource!: StringMap;
    isOpenAppreciationModal: boolean = false;
    id: string = '';
    appreciations: Appreciation[] = [] as any;
    limit: number = 24;
    femaleIcon = "../assets/images/male.png";
    maleIcon = "../assets/images/female.png";
    imageOnline = "../assets/images/online.svg";
    followers = '7 followers';
    following = '10 following';
    customStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    };
    
    constructor(private service: ProfileClient, private route: ActivatedRoute, private appreciationService: AppreciationClient) {
    }
    

    userAccount: UserAccount = JSON.parse(
        sessionStorage.getItem("authService") || "{}"
      ) as UserAccount;

    ngOnInit(): void {
        this.service.getMyProfile(this.userAccount.id || "").then(user => {
            if (user) {
              this.user = user;
            //   console.log('data::::',user);
              this.resource = getResource().resource();
            }
          });
        this.id = buildId<string>(this.route) || ""; 
        if(this.id)
        {
            this.loadData(this.id);
        }
    }
  
    loadData = async (id: string) => {
        if(id)
        {
            const appreciateSM = new AppreciationFilter();
            appreciateSM.userId = id;
            // appreciateSM.limit = this.limit;
            appreciateSM.userIdUseful= storage.getUserId();
            const searchResult = await this.appreciationService.search(appreciateSM, this.limit);
            this.appreciations = searchResult.list;
        }
    }
  
    openModal = (event: any) => {
        event.preventDefault();
        // this.isOpenAppreciationModal = true;
        this.appreciationModal?.open();
    };
  
      onModelClose = () => {
        // this.isOpenAppreciationModal = false;
        this.appreciationModal?.close();
      }
    moreAppreciate = () => {
        this.limit = this.limit + 3; 
        this.loadData(this.id);
    }

    reLoadData = () => {
        this.loadData(this.id)
    }
  
    setData= (data: any) => {

    let newList = [data, ...this.appreciations];
    // newList.unshift(data);
    this.appreciations = newList;
    }

    handleSort = (event: any) => {
        event.preventDefault();
    }
  }