import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Component, OnInit } from "@angular/core";
import { getResource, useResource } from "uione";
import { MyProfileClient } from "./my-profile";
import { MyProfileComponent } from "./my-profile.component";
import { Achievement, Skill, User } from "./my-profile/user";

interface Edit {
  hireable: boolean;
  lookingFor: string;
  interest: string;
  highlight: boolean;
  description: string;
  subject: string;
}

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile-form.html',
  
})
export class MyProfileFormComponent implements OnInit {
  constructor(private service: MyProfileClient) {
  }
  imageOnline = '../assets/images/online.svg';
  user: User = {} as any;
  message = '';
  isOpen = false;
  isEditing = false;
  isEditingBio = false;
  isEditingInterest = false;
  isEditingLookingFor = false;
  isEditingSkill = false;
  isEditingAchievement = false;
  bio = '';
  skill='';
  interest = '';
  lookingFor = '';
  description = '';
  highlight = false;
  modalIsOpen = false;
  resource: StringMap = {};
  followers = '7 followers';
  following = '10 following';
  edit: Edit = {
    hireable: false,
    lookingFor: '',
    interest: '',
    highlight: false,
    description: '',
    subject: ''
  }
  modalConfirmIsOpen = false;
  ngOnInit(): void {
    const id = 'XU3rkqafp';
    this.service.getMyProfile(id).then(user => {
      if (user) {

        this.user = user;
        console.log(user);
        
        this.resource = getResource().resource();

      }
    });
  }
  toggleSkill(event: any): void {
    event.preventDefault();
    this.isEditingSkill = !this.isEditingSkill;
    this.isEditing = !this.isEditing;
  }
  toggleLookingFor(event: any): void {
    event.preventDefault();
    this.isEditingLookingFor = !this.isEditingLookingFor;
    this.isEditing = !this.isEditing;
  }
  // showPopup(event): void {

  //   event.preventDefault();
  //     this.modalIsOpen=true;
  // }
  removeSkill(event: any, skill: string) {
    event.preventDefault();
    this.user.skills = this.user.skills.filter(item => item.skill !== skill);
    this.isEditing = !this.isEditing;
  }
  removeLookingFor(event: any, lookingForContent: string): void {
    event.preventDefault();
    this.user.lookingFor = this.user.lookingFor.filter(item => item !== lookingForContent);
  }

  toggleBio(event:any): void {
    event.preventDefault();
      this.isEditingBio = !this.isEditingBio;
      this.isEditing = !this.isEditing;
  }

  // editBio(e: any):void {
  //   e.preventDefault();
  //   if (this.bio && this.bio.trim() !== '') {
  //     this.user.bio = this.bio;
  //     this.bio='';
  //   }
  // }
  toggleInterest(event: any):void{
    event.preventDefault();
    this.isEditingInterest = !this.isEditingInterest;
    this.isEditing = !this.isEditing;
  }
  removeInterest(event: any, subject: string): void {
    event.preventDefault();
    if (this.user.interests) {
      const interests = this.user.interests.filter((item: string) => item !== subject);
      this.user.interests = interests;
    }
  }
  addInterest(event: any) :void{
    event.preventDefault();
    const interests = this.user.interests ? this.user.interests : [];
    if (this.edit.interest && this.edit.interest.trim() !== '') {
      if (!inArray(interests, this.edit.interest)) {
        interests.push(this.edit.interest);
        this.user.interests = interests;
        this.edit.interest = '';
      } else {
        // UIUtil.alertError(ResourceManager.getString('error_duplicated_interest'), ResourceManager.getString('error'));
      }
    }
  };

  addLookingFor(event:any):void{
    event.preventDefault();
    const lookingForUser = this.user.lookingFor? this.user.lookingFor:[];
    if(this.edit.lookingFor && this.edit.lookingFor.trim()!=''){
      if (!inArray(lookingForUser, this.edit.lookingFor)) {
        lookingForUser.push(this.edit.lookingFor);
        this.user.lookingFor = lookingForUser;
       this.lookingFor = '';
      } else {
        // UIUtil.alertError(ResourceManager.getString('error_duplicated_looking_for'), ResourceManager.getString('error'));
      }
    }
  }
  toggleAchievement(event:any) {
    event.preventDefault();
    this.isEditingAchievement = !this.isEditingAchievement;
    this.isEditing = !this.isEditing;
  }
  removeAchievement(event:any, subject: string): void { 
    event.preventDefault();
    if (this.user.achievements) {
      const achievements = this.user.achievements.filter((item: Achievement) => item['subject'] !== subject);
      this.user.achievements = achievements;
    }
  };
  close(){
    if (this.isEditingBio) {
      this.isEditingBio=!this.isEditingBio;
    }
    if (this.isEditingInterest) {
      this.isEditingInterest=!this.isEditingInterest
    }
    if (this.isEditingLookingFor) {
      this.isEditingLookingFor=!this.isEditingLookingFor
    }
   
    if (this.isEditingSkill) {
      this.skill='';
      this.isEditingSkill=!this.isEditingSkill;
    }
    if (this.isEditingAchievement) {
      this.edit.subject='';
      this.edit.highlight = false;
      this.edit.description='';
      this.isEditingAchievement = !this.isEditingAchievement;
    }
    this.isEditing=!this.isEditing;
  }
  closeModalConfirm (){
    this.modalConfirmIsOpen = false;
  }
  saveChanges(event:any): void {
    event.preventDefault();
    const id = 'XU3rkqafp';
    if (this.isEditing) {
      this.service.saveMyProfile(id,this.user).then(successs => {
        if (successs) {
          // this.initData();
          this.close();
          // UIUtil.showToast(ResourceManager.getString('success_save_my_profile'));
          console.log('success')
        } else {
          console.log('fail')
          // UIUtil.alertError(ResourceManager.getString('fail_save_my_profile'), ResourceManager.getString('error'));
        }
      });
    }
  }
  closeModal(){
    this.modalIsOpen = false;
  }
   saveChangesBio(event:any):void{
     this.saveChanges(event);
    this.bio = this.user.bio || '';
  }
  saveEmit(rs:any){
        if (rs.status === 'success' && rs.data) {

          this.user = rs.user; 

        //   this.setState({ user: ReflectionUtil.clone(rs.data) });
          // UIUtil.showToast(ResourceManager.getString('success_save_my_profile'));
        } else {
          console.log('fail');
          
          // UIUtil.alertError(ResourceManager.getString('fail_save_my_profile'), ResourceManager.getString('error'));
        }
      }
}

export function inArray(arr: string[], item: string): boolean {
  if (!arr || arr.length === 0) {
    return false;
  }
  const isExist = arr.filter(itemFilter => itemFilter === item).length > 0;
  return isExist;
}

export function inAchievements(arr: Achievement[], item: Achievement): boolean {
  if (!arr || arr.length === 0) {
    return false;
  }
  const isExist = arr.filter(itemFilter => itemFilter.subject === item.subject).length > 0;
  return isExist;
}