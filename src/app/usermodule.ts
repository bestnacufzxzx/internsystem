
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

export class Usermodule {

  // <!-- CITIZEN_ID,TITLE,FIRST_NAME,LAST_NAME,SEX,BLOOD,BIRTH_DATE FROM is_t_citizen -->
    ID: string;
    CITIZEN_ID: string;
    TITLE: string;
    FIRST_NAME:string;
    LAST_NAME:string;
    SEX:string;
    BLOOD:string;
    BIRTH_DATE:string;
    USER_NAME:string;
    CREATE_BY:string;
    fromDate:NgbDate;
    toDate:NgbDate;
    dpFromDate: any;
    dpToDate: any;
    // static CREATE_BY: string;
  

    
    // constructor(ID:string, CITIZEN_ID:string, TITLE:string, FIRST_NAME:string, LAST_NAME:string, SEX:string, BLOOD:string, BIRTH_DATE:string) 
    // {
    //   this.ID = ID;
    //   this.CITIZEN_ID = CITIZEN_ID;
    //   if(TITLE === '1'){
    //     this.TITLE = "นาย";
    //   }else if(TITLE === '2'){
    //     this.TITLE = "นาง";
    //   }else if(TITLE === '3'){
    //     this.TITLE = "นางสาว";
    //   }
    //   this.FIRST_NAME = FIRST_NAME;
    //   this.LAST_NAME = LAST_NAME;
    //   if(SEX === 'M'){
    //     this.SEX="ชาย";
    //   }else if(SEX === 'F')(
    //     this.SEX="หญิง"
    //   )
    //   if(BLOOD === '1'){
    //     this.BLOOD="เอ";
    //   }else if(BLOOD === '2'){
    //     this.BLOOD="บี";
    //   }else if(BLOOD === '3'){
    //     this.BLOOD="เอบี";
    //   }else if(BLOOD === '4'){
    //     this.BLOOD="โอ";
    //   }
    //   this.BIRTH_DATE=BIRTH_DATE;
    // }
    
}