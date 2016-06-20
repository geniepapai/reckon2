import {Page, Storage, SqlStorage, NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {VerifyUserPage} from '../verify-user/verify-user';
import {DataProvider} from '../../providers/data-provider/data-provider';

//import {MyApp} from '../../app';

/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Page({
  	templateUrl: 'build/pages/signup/signup.html',
  	providers:[DataProvider]
  })
  export class SignupPage {
  	public signupData = {screenName:'',mobile:''};
  	public message = '';
  	signupResData = {};
  	storageOptions = {name:'__reckoonDatabase'};
  	storage = new Storage(SqlStorage,this.storageOptions);
  	constructor(public restProvider: DataProvider,public nav: NavController) {

      //storage.set('INSTALLID', 'priyaLocal');
      this.storage.get("INSTALLID").then((installId) => {
      	if(installId){
      		console.log("InstallID:"+installId);
      	} else {
      		console.log("InstallID not found!!");
      	}
      }); 
    }

    signupUser(){
      console.log("signup");
  	// let screenName = 'theValueAdder15';
  	// let mobile = '+111515151515';
  	this.restProvider.signupUser(this.signupData.screenName,this.signupData.mobile)
  	.then(resData => {

  		
  		console.log("data from rest req:"+resData['status']);

  		if(resData['status'] == 'pass') {
  			this.signupData.screenName = '';
  			this.signupData.mobile = '';
  			console.log("userid:"+JSON.stringify( resData['data']['userData']));
  			this.storage.set('USERDATA', JSON.stringify(resData['data']['userData']));
  			
  			this.storage.set('LASTERROR', '');
  			console.log("Calling login....");
  			this.loginUser().then(res => {
  				if(res){
  					console.log("Calling login successful go to verify page....");
  					//this.nav.push(HomePage);
  					//this.nav.setRoot(HomePage);
  					this.nav.setRoot(VerifyUserPage,
  						{phoneNumber:resData['data']['userData']['username'],
  						verifyCode:resData['data']['userData']['profile']['smscode']});
  				} else {
  					this.storage.get("LASTERROR").then((lastError) => {
  						console.log("Login Failed:"+ lastError);
  					});

  				}
  			});
  			

  		} else {
  			//alert("Signup failed");
  			if(resData['error'] == 403 && resData['reason'] == 'Username already exists.'){
  				this.message = 'This phone number is already registered, try logging in';
  				this.storage.set('LASTERROR', this.message);
  			}
  		}
  	}, error => {this.message = JSON.stringify(error)});
  	//this.storage.set()
  }

  loginUser(){
  	return new Promise(resolve => {
  		this.storage.get("USERDATA").then((userData) => {
  			let userDataJSON = JSON.parse(userData);
  			console.log("username data sent to rest req:"+userDataJSON.username);
  			console.log("smscode data sent to rest req:"+userDataJSON.profile.smscode);
  			this.restProvider.loginUser(userDataJSON.username,userDataJSON.profile.smscode)
  			.then(resData => {


  				console.log("status from rest req:"+JSON.stringify(resData['status'] ));

  				if(resData['status'] == 'success') {

  					console.log("from login response userid:"+resData['data']['userId']);
  					console.log("from login response authtoken:"+resData['data']['authToken']);
  					userDataJSON.authToken = resData['data']['authToken'];
  					this.storage.set('USERDATA',JSON.stringify(userDataJSON));
  					this.storage.set('LASTERROR', '');
  					console.log("Calling feed page....");
  					resolve(true);
  				} else {
  			//alert("Signup failed");
  			if(resData['error'] == 401 ){
  				this.message = 'Code: 444 Cannot login, contact support with the code.';
  				this.storage.set('LASTERROR', this.message);
  				resolve(false);
  			} else {
  				console.log("error data from rest req:"+JSON.stringify(resData));
  				resolve(false);
  			}
  		}
  	});
  		}); 
  	});
  }

  loginReturningUser(){
     console.log("calling returning user mobile:"+this.signupData.mobile);
    let authToken = '';
    let userId = '';
    this.restProvider.loginUser(this.signupData.mobile,9191)
    .then(resData => {


      console.log("=====status from rest req:"+JSON.stringify(resData['status'] ));

      if(resData['status'] == 'success') {

        console.log("====from login response userid:"+resData['data']['userId']);
        console.log("====from login response authtoken:"+resData['data']['authToken']);
        authToken = resData['data']['authToken'];
        userId = resData['data']['userId'];

        this.storage.set('USERDATA',JSON.stringify({_id: userId,authToken: authToken}));
        this.storage.set('LASTERROR', '');
        console.log("Calling profile data....");
        this.restProvider.getProfile(userId)
        .then(resData => {


          console.log("====status from profile data rest req:"+JSON.stringify(resData['status'] ));

          if(resData['status'] == 'pass') {
            let userResData = resData['data'];
            userResData.authToken = authToken;
            this.storage.set('USERDATA', JSON.stringify(userResData));
            console.log("====home page transition");
            this.nav.setRoot(HomePage);
          }
        });
        //resolve(true);
      } else {
        //alert("Signup failed");
        if(resData['status'] == 'error' ){
          this.message = 'Code: 444 Cannot login, contact support with the code.';
          this.storage.set('LASTERROR', this.message);
          //resolve(false);
        } else {
          console.log("error data from rest req:"+JSON.stringify(resData));
          //resolve(false);
        }
      }
    });
  }
}
