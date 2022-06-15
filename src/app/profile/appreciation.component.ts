import { storage } from 'uione';
// import { useAppreciationService, useAppreciationReplyService } from './user';
import { Appreciation, UsefulAppreciation, AppreciationClient } from './appreciation';
import { AppreciationReplyFilter, AppreciationReply, AppreciationReplyClient } from './appreciation-reply';
// import { Options, Vue } from "vue-class-component";
// import PostAppreciationForm from "./post-appreciation-form.vue";
import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ModalComponent } from "../shared/modal/modal.component";

@Component({
    selector: 'app-appreciation',
    templateUrl: './appreciation.html',
    styleUrls: ['./rate.css']
  })


export class AppreciationReplys implements OnInit {
    @Output() reLoadData: EventEmitter<any> = new EventEmitter<any>();
    @Output() setDataAppreciation: EventEmitter<any> = new EventEmitter<any>();
    @Input() appreciation: Appreciation = {} as any;
    @ViewChild('appreciationModal') appreciationModal?: ModalComponent ;

    like = '../assets/images/like.svg';
    likeFilled = '../assets/images/like_filled.svg';
    appreciationsReplies: AppreciationReply[] = [] as any;
    replyAppreciation: boolean = false;
    limit: number = 24;
    showReply: boolean = false;
    isOpenAppreciationModal: boolean = false;
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
    constructor(private appreciationService: AppreciationClient, private appreciationReplyService: AppreciationReplyClient) {
    }

    ngOnInit(): void {

    }

    fomatDate = (date: Date | undefined | string): string => {
        if(date)
        {
            let newDate = new Date(date);
            let time = newDate.toLocaleDateString();
            return time;
        }
        return '';
        
    }

    postUseful = async (app: Appreciation | AppreciationReply) => {
        let rs: any;
        const useful: UsefulAppreciation = {
            appreciationId: app.id || '',
            userId: storage.getUserId() || ''
        }
        
        if (this.appreciationReplyService && this.replyAppreciation) {
            rs = await this.appreciationReplyService.usefulAppreciation(useful)
        } else if (this.appreciationService && !this.replyAppreciation) {
            rs = await this.appreciationService.usefulAppreciation(useful)
        }

        if (rs == 2)//2:Delete 1:Insert
            this.appreciation = ({ ...app, isUseful: false, usefulCount: app.usefulCount - 1 })
        else { this.appreciation = ({ ...app, isUseful: true, usefulCount: app.usefulCount + 1 }) }
        this.reLoadDataEmit();
    }

    openModal = (event:any) => {
        event.preventDefault();
        // this.isOpenAppreciationModal = true;
        this.appreciationModal?.open();
    };

    onModelClose = () => {
        // this.isOpenAppreciationModal = false;
        this.appreciationModal?.close();
    }

    reLoadDataEmit = () => {
         this.reLoadData.emit();
    }

    getMoreAppreciations = async  (event: any,id: string | undefined) => {
        event.preventDefault();
        // const appreciationReplyService = useAppreciationReplyService();
        if(!this.appreciationReplyService) return;
        const filter: AppreciationReplyFilter = {
            appreciationId: id,
            limit: this.limit,
        }
        const rs = await this.appreciationReplyService.search(filter)
        if (rs)
            this.appreciationsReplies = rs.list;
            this.showReply = !this.showReply
            
    }
    setData = (data:any) => {
        
      if (this.showReply) {
        let newList = [data,...this.appreciationsReplies];
        this.appreciationsReplies = newList;
        
      }

      if (this.appreciation)
          this.appreciation = { ...this.appreciation, replyCount: this.appreciation.replyCount + 1 }
    }
    
}