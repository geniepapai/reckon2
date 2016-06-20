import {Page, NavController} from 'ionic-angular';
import {ProfilePage} from '../profile/profile';
import {TimeAgoPipe,DateFormatPipe,DurationPipe} from 'angular2-moment';
import {DataProvider} from '../../providers/data-provider/data-provider';
import {TextShort} from '../../pipes/TextShort';
/*
  Generated class for the DiscoverPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Page({
  	templateUrl: 'build/pages/discover/discover.html',
  	providers:[DataProvider],
  	pipes:[TextShort,TimeAgoPipe,DateFormatPipe,DurationPipe]
  })
  export class DiscoverPage {
  	discoverFeed = [];
  	isSelected = "follow";
  	constructor(public restProvider: DataProvider,public nav: NavController) {
  		this.restProvider.discover().then(data => {
  			console.log("Data from discover req:"+JSON.stringify(data));
  			if(data.length == 0){
  				console.log("Nothing to discover, create reckoons....");
  			} else {
  				if(data['status'] == 'pass'){
  					this.discoverFeed  = data['data']['feedData']; 
  				}
  			}
  		});
  	}

  	selected(reckoonId,event){
  		console.log("reckoon selected:"+reckoonId);

  		let myInput =  document.getElementById(reckoonId);
  		if(myInput.innerHTML != "following"){
  			console.log("button:"+myInput);
  			myInput.innerHTML = "...";
  			this.restProvider.followUnfollowReckoon(reckoonId,"FOLLOW").then(data => {
  			console.log("Data from follow reckoon req:"+JSON.stringify(data));
  			if(data['status'] == 'fail'){
  				console.log("Could not follow...."+ JSON.stringify(data));
  				myInput.innerHTML = "error";
  			} else {
  				if(data['status'] == 'pass'){
  					myInput.innerHTML = "following";
  					console.log("Now following <"+reckoonId+"> json:"+JSON.stringify(data)) ;
  				}
  			}
  		});
  		} else {
  			console.log("unfollow button:"+myInput);
  			myInput.innerHTML = "...";
  			this.restProvider.followUnfollowReckoon(reckoonId, "UNFOLLOW").then(data => {
  			console.log("Data from follow reckoon req:"+JSON.stringify(data));
  			if(data['status'] == 'fail'){
  				console.log("Could not unfollow...."+ JSON.stringify(data));
  				myInput.innerHTML = "error";
  			} else {
  				if(data['status'] == 'pass'){
  					myInput.innerHTML = "follow";
  					console.log("Unfollowed <"+reckoonId+"> json:"+JSON.stringify(data)) ;
  				}
  			}
  		});
  		}
  		//myInput.setActive ;
  		//console.log("button:"+myInput.innerHTML = "following");
  		//console.log("is selected:"+ chkbox.isChecked());
  	}

  	showProfile(screenName){
  		let imessage = 'my profile';
  		console.log("the value:"+screenName);
  		this.nav.push(ProfilePage, {data:{screenName:screenName , message:imessage}});
  	}
  }
