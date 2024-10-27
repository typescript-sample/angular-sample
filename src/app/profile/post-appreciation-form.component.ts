    import { storage, UserAccount } from 'uione';
    import { AppreciationReply, AppreciationReplyClient } from './appreciation-reply';
    import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
    import { buildId } from "angularx";
    import { ActivatedRoute } from "@angular/router";
    import { Appreciation, AppreciationFilter, AppreciationClient } from './appreciation';

    @Component({
    selector: 'app-post-appreciation',
    templateUrl: './post-appreciation-form.html',
    styleUrls: ['./rate.css']
    })
    export class PostAppreciationForm implements OnInit {

    @Output() onModelClose: EventEmitter<any> = new EventEmitter<any>();
    @Output() setData: EventEmitter<any> = new EventEmitter<any>();
    @Output() reLoadData: EventEmitter<any> = new EventEmitter<any>();
    @Input() appreciation: Appreciation = {} as any;
  
    //   appreciationService = useAppreciationService();
    //   appreciationReplyService = useAppreciationReplyService();
    title: string = '';
    description:string = '';
    dataApp: Appreciation | AppreciationReply = {} as any;
    isOpenAppreciationModal: boolean = true;
    //   dataUser: User = {} as any;
    id:string = '';
      // result: any ;
    appreciationId: string = '';
    // userAccount: UserAccount = JSON.parse(
    //     sessionStorage.getItem("authService") || "{}"
    //   ) as UserAccount;

    constructor(private route: ActivatedRoute, private appreciationService: AppreciationClient, private appreciationReplyService: AppreciationReplyClient) {
    }

    ngOnInit(): void {
        this.id = buildId<string>(this.route) || ""; 
        this.appreciationId = this.appreciation?.id ?  this.appreciation.id : '';
    }
  
    
    postReview = async (event: any) => {
        event.preventDefault();

        const userId = this.id ;
        const id: string | undefined = storage.getUserId();
        if (!this.appreciationService) { this.closeModal(); return }
        if (!this.appreciationId) {
            
        const appreciation: Appreciation = {
            userId,
            authorId: id || '',
            title: this.title,
            description: this.description,
            usefulCount: 0,
            replyCount: 0,
            createdAt: this.createDate(),
        }
        const data = await this.appreciationService.create(appreciation);
        const newAppreciation: Appreciation = (data as any)['value']
        this.setDataEmit(newAppreciation);
        this.loadData();
        this.closeModal();
            this.title = '';
            this.description = '';
        return
        }
        
        if (!this.appreciationReplyService) { this.closeModal(); return }
        const appreciation: AppreciationReply = {
        userId,
        authorId: id || '',
        title: this.title,
        description: this.description,
        usefulCount: 0,
        replyCount: 0,
        createdAt: this.createDate(),
        appreciationId: this.appreciationId
        }
        const data = await this.appreciationReplyService?.insertReply(appreciation);
        const newAppreciation: AppreciationReply = (data as any)['value']
        this.setDataEmit(newAppreciation);
        this.loadData();
        this.closeModal();
        this.title = '';
        this.description = '';
        return;
    };
  
    closeModal(){
        this.onModelClose.emit();
        // this.review = '';
    }
  
      loadData(){
          this.reLoadData.emit();
      }
  
    setDataEmit(newAppreciation: any){
        this.setData.emit(newAppreciation);
    }
  
      createDate() {
          const today = new Date();
          const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          const dateTime = date +' '+ time;
          return dateTime;
      }
  }