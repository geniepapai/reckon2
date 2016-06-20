import {Page, NavController, Toast, NavParams, ViewController} from 'ionic-angular';
import {DataProvider} from '../../providers/data-provider/data-provider';
/*
  Generated class for the ReckoonModalPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Page({
  	templateUrl: 'build/pages/reckoon-modal/reckoon-modal.html',
  	providers:[DataProvider],
  })
  export class ReckoonModalPage {
  	type="";
  	currParams:NavParams ;
  	message = "";
  	constructor(public restProvider: DataProvider,public params: NavParams,public nav: NavController,private viewCtrl: ViewController) {
  		this.currParams = params;
  		this.whichModal(params);
  	}
  	
  	close() {

  		if(this.type === 'ADDMESSAGE' || this.type === 'ADDVALUE'){
  			let reckoonId = this.currParams.get('reckoonId');
  			let commentType = ""
  			if(this.type === 'ADDVALUE'){
  				commentType = 'VALUE';
  			} else {
  				commentType = 'COMMENT';

  			}
  			let reqData = {"reckoonId":reckoonId,"message":this.message,"commentType":commentType};
  			this.restProvider.addReckoonComment(reqData).then(data => {

  				console.log("Data from add comment req:"+JSON.stringify(reqData));
  				if(data['status'] == 'pass'){
  					this.viewCtrl.dismiss();
  					let toast = Toast.create({
  							message: 'Message added ',//+data['message'],
  							duration: 2000
  						});

  					toast.onDismiss(() => {
  						console.log('Dismissed toast');
  					});

  				}
  			});
  		}
  	}

  	whichModal(params){

  		this.type = params.get('type');
  		if(this.type == 'ADDMESSAGE'){
  			//
  		}
  	}
  }
