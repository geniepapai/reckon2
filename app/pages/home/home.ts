import {Modal, Page,NavController} from 'ionic-angular';
import {DataProvider} from '../../providers/data-provider/data-provider';
import {TextShort} from '../../pipes/TextShort';
import {TimeAgoPipe,DateFormatPipe,DurationPipe} from 'angular2-moment';
import {ReckoonDetailPage} from '../reckoon-detail/reckoon-detail';
import {ProfilePage} from '../profile/profile';
import {CreateReckoonChoosePage} from '../create-reckoon-choose/create-reckoon-choose';
import {DiscoverPage} from '../discover/discover';
import {ReckoonModalPage} from '../reckoon-modal/reckoon-modal';
//import * as {moment} from 'angular2-moment';
@Page({
	templateUrl: 'build/pages/home/home.html',
	providers:[DataProvider],
	pipes:[TextShort,TimeAgoPipe,DateFormatPipe,DurationPipe]
})
export class HomePage {
	public me = {screenName:'',message:'',unit:''};
	public feedData = [];

	constructor(public restProvider: DataProvider,public nav:NavController) {

		this.restProvider.loadUserFeed().then(data => {
			//console.log("Data from feed req:"+JSON.stringify(data));
			if(data.length == 0){
				console.log("No data for feed yet, go to discover reckoons....");
			} else {
				this.feedData  = data; 
			}
		});

	}

	public addCard(){
		let addMe = this.me;
		this.feedData.push(addMe);
	}
	public createReckoon(){
		
		this.nav.push(CreateReckoonChoosePage);
	}
	public showDetail(e){
		let imessage = 'hello details';
		console.log("reckoonId from card click home.html:"+e);
		this.nav.push(ReckoonDetailPage, {data:{reckoonId: e,message:imessage}});
	}

	public showProfile(screenName, userid){
		let imessage = 'my profile';
		console.log("the value:"+screenName);
		this.nav.push(ProfilePage, {data:{screenName: screenName, userId: userid,message:imessage}});
	}
	public addMessage(screenName, reckoonId, type){
		let imessage = 'my profile';
		console.log("adding message screen name:"+screenName);
		let modal = Modal.create(ReckoonModalPage,{type:type,reckoonId:reckoonId});
		this.nav.present(modal);
		//this.feedData.find({_id:reckoonId}).
	}
	public discover(){
		let imessage = 'hello details';
		this.nav.push(DiscoverPage);
	}

	public getDays(currDate,reckoonId,numberOrDays){
		let localDate:any = new Date(currDate);
		let  reckoonDate:any  = new Date();
		//let myElem =  document.getElementById(reckoonId);
		//myElem.innerHTML = "changed";
		let dateDiff:any = (localDate - reckoonDate);
		let diffDays:any = parseInt((dateDiff) / (1000 * 60 * 60 * 24)); 
		//console.log("daysdiff:"+diffDays);
		if(diffDays > 0){
			if(numberOrDays == 'DAYS'){
				return diffDays;
			} else {
				return 'until'
			}
		} else {
			if(numberOrDays == 'DAYS'){
				return Math.abs(diffDays);
			} else {
				return 'since'
			}
		}
	}
}
