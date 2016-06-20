import {Injectable} from '@angular/core';
import {Storage,SqlStorage, NavController} from 'ionic-angular';
import {Http, Headers, Response, RequestOptions,URLSearchParams} from '@angular/http';
//import {SignupPage} from '../../pages/signup/signup';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class DataProvider {
    private signupURL = "/signup"
    private loginURL = '/login';
    private profileURL = "/user/profile";
    private feedURL = "/user/feed";
    private discoverURL = "/user/discover";
    private verifyURL = "/user/verify";
    private addReckoonCommentURL = "/user/comment";
    private createReckoonURL = "/user/reckoon";
    private reckoonDetailURL = "/user/reckoon/"
    private reckoonFollowURL = "/user/reckoon/follow/";// the url is /user/reckoon/:reckoonid/follow
    private reckoonCommentsURL = "/user/reckoon/comments/" ; //the url is user/reckoon/:reckoonId/comments
    //private RECKOON_URL = "http://localhost:3000/api";  // URL to local web api
    private RECKOON_URL = "http://ec2-52-32-64-99.us-west-2.compute.amazonaws.com/api";  // URL to AMAZON web api
    //details of user +111313131313 @todo get dynamically
    private USER_ID = ""
    private USER_TOKEN = ""
    private headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": this.USER_TOKEN,
      "X-User-Id": this.USER_ID
    });
    private options = new RequestOptions({ headers: this.headers });
    data: any = null;
    discoverData: any = null;
    reckoonData: any = null;
    commentsData: any = null;
    signupData: any = null;
    storageOptions = {name:'__reckoonDatabase'};
    storage = new Storage(SqlStorage,this.storageOptions);
    constructor(public http: Http, public nav: NavController) {

    }

    setAuthHeader(){


      this.storage.get("USERDATA").then((userData) => {
        if(userData){
          let authToken = userData.authToken;
          if(!authToken){
            console.log("no token found go to login");
          //this.rootPage = SignupPage;
          // if(this.signupPage.loginUser()){
          //   console.log("login called set the headers again");
          //   this.setAuthHeader();
          // } else {
          //   console.log("Oops Error logging in... We are working to fix it. ")
          // }

        } else {
          this.USER_ID = userData._id;
          this.USER_TOKEN = userData.authToken;
        }
      } else {
        console.log("no user data found go to signup");
          //this.rootPage = SignupPage;
          //this.nav.push(SignupPage);
        }
      }); 
    }

    getProfile(reqForUserId) {

     // construct the URL, adding the search term to the url
     let url = this.RECKOON_URL + this.profileURL+"?reqForUserId="+reqForUserId

    // don't have the data yet
    return new Promise(resolve => {

      this.storage.get("USERDATA").then((userData) => {
        let userDataJSON = JSON.parse(userData);
        let authToken = userDataJSON.authToken;
        if(!authToken){
          console.log("no token found go to login");
          let data = {status:"fail",data:{message:"No Auth Token Found, Try Login first"}};
          resolve(data);
        } else {
          console.log("Token and user set:"+ userDataJSON.authToken);
          // this.USER_ID = userDataJSON._id;
          // this.USER_TOKEN = userDataJSON.authToken;
          let hdrs = new Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": userDataJSON.authToken,
            "X-User-Id": userDataJSON._id
          });
          let opts = new RequestOptions({ headers: hdrs });
        
          // We're using Angular Http provider to request the data,
          // then on the response it'll map the JSON data to a parsed JS object.
          // Next we process the data and resolve the promise with the new data.
          this.http.get(url, opts)
          .map(res => res.json())
          .subscribe(data => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              console.log("get profile call status:"+data['status']);
              resolve(data);
            });
        }
      });
      
    });
  }

  followUnfollowReckoon(reckoonId,ops) {

     // construct the URL, adding the search term to the url
     let url = this.RECKOON_URL + this.reckoonFollowURL + reckoonId ;

    // don't have the data yet
    return new Promise(resolve => {

      this.storage.get("USERDATA").then((userData) => {
        let userDataJSON = JSON.parse(userData);
        let authToken = userDataJSON.authToken;
        if(!authToken){
          console.log("no token found go to login");
          let data = {status:"fail",data:{message:"No Auth Token Found, Try Login first"}};
          resolve(data);
        } else {
          console.log("Token and user set:"+ userDataJSON.authToken);
          // this.USER_ID = userDataJSON._id;
          // this.USER_TOKEN = userDataJSON.authToken;
          let hdrs = new Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": userDataJSON.authToken,
            "X-User-Id": userDataJSON._id
          });
          let opts = new RequestOptions({ headers: hdrs });

          let body = JSON.stringify({data:{reckoonId:reckoonId}});
          console.log("body of follow req:"+body);
          // We're using Angular Http provider to request the data,
          // then on the response it'll map the JSON data to a parsed JS object.
          // Next we process the data and resolve the promise with the new data.
          if(ops === 'FOLLOW'){
            this.http.post(url,body, opts)
            .map(res => res.json())
            .subscribe(data => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              console.log("follow reckoon call status:"+data['status']);
              resolve(data);
            });
          } else if(ops === 'UNFOLLOW'){
            this.http.delete(url,opts)
            .map(res => res.json())
            .subscribe(data => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              console.log("unfollow reckoon call status:"+data['status']);
              resolve(data);
            });
          }
        }
      });
      
    });
  }

  addReckoonComment(reqData) {

     // construct the URL, adding the search term to the url
     let url = this.RECKOON_URL + this.addReckoonCommentURL

    // don't have the data yet
    return new Promise(resolve => {

      this.storage.get("USERDATA").then((userData) => {
        let userDataJSON = JSON.parse(userData);
        let authToken = userDataJSON.authToken;
        if(!authToken){
          console.log("no token found go to login");
          let data = {status:"fail",data:{message:"No Auth Token Found, Try Login first"}};
          resolve(data);
        } else {
          console.log("Token and user set:"+ userDataJSON.authToken);
          // this.USER_ID = userDataJSON._id;
          // this.USER_TOKEN = userDataJSON.authToken;
          let hdrs = new Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": userDataJSON.authToken,
            "X-User-Id": userDataJSON._id
          });
          let opts = new RequestOptions({ headers: hdrs });

          let body = JSON.stringify({data:reqData});
          console.log("body of create reckoon req:"+body);
          // We're using Angular Http provider to request the data,
          // then on the response it'll map the JSON data to a parsed JS object.
          // Next we process the data and resolve the promise with the new data.
          this.http.post(url,body, opts)
          .map(res => res.json())
          .subscribe(data => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              console.log("create reckoon call status:"+data['status']);
              resolve(data);
            });
        }
      });
      
    });
  }

  createReckoon(reqData) {

     // construct the URL, adding the search term to the url
     let url = this.RECKOON_URL + this.createReckoonURL

    // don't have the data yet
    return new Promise(resolve => {

      this.storage.get("USERDATA").then((userData) => {
        let userDataJSON = JSON.parse(userData);
        let authToken = userDataJSON.authToken;
        if(!authToken){
          console.log("no token found go to login");
          let data = {status:"fail",data:{message:"No Auth Token Found, Try Login first"}};
          resolve(data);
        } else {
          console.log("Token and user set:"+ userDataJSON.authToken);
          // this.USER_ID = userDataJSON._id;
          // this.USER_TOKEN = userDataJSON.authToken;
          let hdrs = new Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": userDataJSON.authToken,
            "X-User-Id": userDataJSON._id
          });
          let opts = new RequestOptions({ headers: hdrs });

          let body = JSON.stringify({data:reqData});
          console.log("body of create reckoon req:"+body);
          // We're using Angular Http provider to request the data,
          // then on the response it'll map the JSON data to a parsed JS object.
          // Next we process the data and resolve the promise with the new data.
          this.http.post(url,body, opts)
          .map(res => res.json())
          .subscribe(data => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              console.log("create reckoon call status:"+data['status']);
              resolve(data);
            });
        }
      });
      
    });
  }

  verifyUser(smscode) {

     // construct the URL, adding the search term to the url
     let url = this.RECKOON_URL + this.verifyURL

    // don't have the data yet
    return new Promise(resolve => {

      this.storage.get("USERDATA").then((userData) => {
        let userDataJSON = JSON.parse(userData);
        let authToken = userDataJSON.authToken;
        if(!authToken){
          console.log("no token found go to login");
          let data = {status:"fail",data:{message:"No Auth Token Found, Try Login first"}};
          resolve(data);
        } else {
          console.log("Token and user set:"+ userDataJSON.authToken);
          // this.USER_ID = userDataJSON._id;
          // this.USER_TOKEN = userDataJSON.authToken;
          let hdrs = new Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": userDataJSON.authToken,
            "X-User-Id": userDataJSON._id
          });
          let opts = new RequestOptions({ headers: hdrs });

          let body = JSON.stringify({data:{smscode:smscode}});
          console.log("body of verify req:"+body);
          // We're using Angular Http provider to request the data,
          // then on the response it'll map the JSON data to a parsed JS object.
          // Next we process the data and resolve the promise with the new data.
          this.http.post(url,body, opts)
          .map(res => res.json())
          .subscribe(data => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              console.log("verfication call status:"+data['status']);
              resolve(data);
            });
        }
      });
      
    });
  }

  discover() {

     // construct the URL, adding the search term to the url
     let url = this.RECKOON_URL + this.discoverURL
     if (this.discoverData) {
      // already loaded data
      return Promise.resolve(this.discoverData);
    }

    // don't have the data yet
    return new Promise(resolve => {

      this.storage.get("USERDATA").then((userData) => {
        let userDataJSON = JSON.parse(userData);
        let authToken = userDataJSON.authToken;
        if(!authToken){
          console.log("no token found go to login");
          this.discoverData = {status:"fail",data:{message:"No Auth Token Found, Try Login first"}};
          resolve(this.discoverData);
        } else {
          console.log("Token and user set:"+ userDataJSON.authToken);
          // this.USER_ID = userDataJSON._id;
          // this.USER_TOKEN = userDataJSON.authToken;
          let hdrs = new Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": userDataJSON.authToken,
            "X-User-Id": userDataJSON._id
          });
          let opts = new RequestOptions({ headers: hdrs });
          // We're using Angular Http provider to request the data,
          // then on the response it'll map the JSON data to a parsed JS object.
          // Next we process the data and resolve the promise with the new data.
          this.http.get(url,opts)
          .map(res => res.json())
          .subscribe(data => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              console.log("after setting the token");
              this.discoverData = data;
              resolve(this.discoverData);
            }, error => {console.log("error:"+JSON.stringify(error))});
        }
      });
      
    });
  }

  loadUserFeed() {

     // construct the URL, adding the search term to the url
     let url = this.RECKOON_URL + this.feedURL
     if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {

      this.storage.get("USERDATA").then((userData) => {
        let userDataJSON = JSON.parse(userData);
        let authToken = userDataJSON.authToken;
        if(!authToken){
          console.log("no token found go to login");
          this.data = {status:"fail",data:{message:"No Auth Token Found, Try Login first"}};
          resolve(this.data);
        } else {
          console.log("Token and user set:"+ userDataJSON.authToken);
          // this.USER_ID = userDataJSON._id;
          // this.USER_TOKEN = userDataJSON.authToken;
          let hdrs = new Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": userDataJSON.authToken,
            "X-User-Id": userDataJSON._id
          });
          let opts = new RequestOptions({ headers: hdrs });
          // We're using Angular Http provider to request the data,
          // then on the response it'll map the JSON data to a parsed JS object.
          // Next we process the data and resolve the promise with the new data.
          this.http.get(url,opts)
          .map(res => res.json())
          .subscribe(data => {
              // we've got back the raw data, now generate the core schedule data
              // and save the data for later reference
              console.log("after setting the token");
              this.data = data.data.feedData;
              resolve(this.data);
            });
        }
      });
      
    });
  }

  loadReckoonDetails(reckoonId){

    // construct the URL, adding the search term to the url
    let url = this.RECKOON_URL + this.reckoonDetailURL + reckoonId;
    console.log("url:"+url);
    if (this.reckoonData) {
      // already loaded data
      return Promise.resolve(this.reckoonData);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.storage.get("USERDATA").then((userData) => {
        let userDataJSON = JSON.parse(userData);
        let authToken = userDataJSON.authToken;
        if(!authToken){
          console.log("no token found go to login");
          this.data = {status:"fail",data:{message:"No Auth Token Found, Try Login first"}};
          resolve(this.data);
        } else {
          console.log("Token and user set:"+ userDataJSON.authToken);
          // this.USER_ID = userDataJSON._id;
          // this.USER_TOKEN = userDataJSON.authToken;
          let hdrs = new Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": userDataJSON.authToken,
            "X-User-Id": userDataJSON._id
          });
          let opts = new RequestOptions({ headers: hdrs });
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(url,opts)
      .map(res => res.json())
      .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.reckoonData = data.data.reckoonDetails;
          resolve(this.reckoonData);
        });
    }
  });
    });
  }

  // Use: To get all the comments for a particular reckoon
  // Params: 
  // reckoonId: the reckoon id that you need comments for 
  // type: 
  //   ALL: get all comments and values
  //   VALUES: only values
  //   COMMENTS: only text comments

  loadComments(reckoonId, type){

    // construct the URL, adding the search term to the url
    let url = this.RECKOON_URL + this.reckoonCommentsURL + reckoonId + "?type="+type;
    console.log("url:"+url);
    if (this.commentsData) {
      // already loaded data
      return Promise.resolve(this.commentsData);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.storage.get("USERDATA").then((userData) => {
        let userDataJSON = JSON.parse(userData);
        let authToken = userDataJSON.authToken;
        if(!authToken){
          console.log("no token found go to login");
          this.data = {status:"fail",data:{message:"No Auth Token Found, Try Login first"}};
          resolve(this.data);
        } else {
          console.log("Token and user set:"+ userDataJSON.authToken);
          // this.USER_ID = userDataJSON._id;
          // this.USER_TOKEN = userDataJSON.authToken;
          let hdrs = new Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": userDataJSON.authToken,
            "X-User-Id": userDataJSON._id
          });
          let opts = new RequestOptions({ headers: hdrs });
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(url,opts)
      .map(res => res.json())
      .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.commentsData = data.data;
          resolve(this.commentsData);
        });
    }
  });
    });
  }

  signupUser(screenName, mobile){
    // construct the URL, adding the search term to the url
    let url = this.RECKOON_URL + this.signupURL;
    console.log("url:"+url);
    // if (this.signupData) {
    //   // already loaded data
    //   return Promise.resolve(this.signupData);
    // }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let body = JSON.stringify({data:{phonenumber:mobile,screenName:screenName}});
      this.http.post(url,body,this.options)
      .map(res => res.json())
      .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          //this.signupData = data;
          resolve(data);
        });
    });
  }

  loginUser(mobile,verificationCode){
    // construct the URL, adding the search term to the url
    let url = this.RECKOON_URL + this.loginURL;
    console.log("url:"+url);
    

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let body = JSON.stringify({username:mobile,password:mobile,verificationCode:verificationCode});
      this.http.post(url,body,this.options)
      .map(res => res.json())
      .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          //this.signupData = data;
          resolve(data);
        });
    });
  }
}

