import {App, Platform, Storage,SqlStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {MastheadPage} from './pages/masthead/masthead';
import {HomePage} from './pages/home/home';
import {SignupPage} from './pages/signup/signup';
import {Push} from 'ionic-native';
//import {OneSignal} from "../plugins/onesignal-cordova-plugin/www/OneSignal";

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  //OneSignal:any;
  rootPage: any = MastheadPage;
  storageOptions = {name:'__reckoonDatabase'};
  storage = new Storage(SqlStorage,this.storageOptions);
  constructor(platform: Platform ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // the ionic push section
      //let pluginObj = (<any>window).plugins.OneSignal;
      // * let appId = "25f9c14b-6aa3-4cfd-8912-d39a1377be1d"; 
      // * let googleProjectNumber = "267840720287"; 
      //- See more at: http://www.codingandclimbing.co.uk/blog/ionic-2-setup-push-notifications-for-android-with-onesignal-17#sthash.SsEonNzE.dpuf
     // Enable to debug issues.
       //pluginObj.setLogLevel({logLevel: 4, visualLevel: 4});

      // var notificationOpenedCallback = function(jsonData) {
      //   console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
      // };

      // pluginObj.init(appId,
      //   {googleProjectNumber: googleProjectNumber},
      //   notificationOpenedCallback);
      

      // * window.plugins.OneSignal.init(appId, {googleProjectNumber: googleProjectNumber}, notificationOpenedCallback); 
      //- See more at: http://www.codingandclimbing.co.uk/blog/ionic-2-setup-push-notifications-for-android-with-onesignal-17#sthash.SsEonNzE.dpuf
      // Show an alert box if a notification comes in when the user is in your app.
      //pluginObj.enableInAppAlertNotification(true);


  


      //end of ionic push section
      StatusBar.styleDefault();
    });
    this.storage.clear();
    this.storage.set('INSTALLID', 'priyaLocal');
    this.storage.get("USERDATA").then((userData) => {
      if(userData){
        let userDataJSON = JSON.parse(userData);
        let authToken = userDataJSON.authToken;
        if(!authToken){
          console.log("notoken found go to login");
          //this.rootPage = SignupPage;
        //this.nav.push(SignupPage);
        
      } else {
        console.log("Token found go to home page");
        this.rootPage = HomePage;
      }
    } else {
      console.log("No User data found go to signup");
      this.rootPage = SignupPage;
    }
  }); 
    
  }
}
