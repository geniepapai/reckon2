import {Page, Toast, NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';
import {DataProvider} from '../../providers/data-provider/data-provider';
/*
  Generated class for the VerifyUserPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Page({
  	templateUrl: 'build/pages/verify-user/verify-user.html',
  	providers:[DataProvider]
  })
  export class VerifyUserPage {
  	phoneNumber = '';
  	verifyCode = '';
  	inputCode = '';
  	constructor(public restProvider: DataProvider,public nav: NavController, public navParams: NavParams) {
  		this.phoneNumber = navParams.get("phoneNumber");
  		this.verifyCode = navParams.get("verifyCode");
  	}


  	verifyUser(){
  		if(this.inputCode == this.verifyCode){
  			
  			this.restProvider.verifyUser(this.inputCode)
  			.then(resData => {


  				console.log("data from rest req:"+resData['status']);

  				if(resData['status'] == 'pass') {
  					let toast = Toast.create({
  						message: 'Verification success',
  						duration: 2000
  					});

  					toast.onDismiss(() => {
  						console.log('Dismissed toast');
  					});

  					this.nav.present(toast);
  					this.inputCode = '';
  					this.nav.setRoot(HomePage);
  				}
  			});
  		}
  	}
  }
