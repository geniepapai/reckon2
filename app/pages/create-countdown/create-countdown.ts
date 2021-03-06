import {Page, Toast, NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {DataProvider} from '../../providers/data-provider/data-provider';
/*
  Generated class for the CreateCountdownPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/create-countdown/create-countdown.html',
  providers:[DataProvider],
})
export class CreateCountdownPage {
	public reckoonName ='';
  	public reckoonEndDate ='';
  	public visibility = 'PUBLIC';
  	public comment = '';
  	public type = 'COUNTDOWN';
  constructor(public restProvider: DataProvider,public nav: NavController) {}

    	createReckoon(){
  		let reqData = {"endDateTime":this.reckoonEndDate,
  		"message":this.reckoonName, 
  		"type":this.type, "visibility":this.visibility}
  		this.restProvider.createReckoon(reqData).then(data => {
  			console.log("Data from create countdown req:"+JSON.stringify(reqData));
  			if(data['status'] == 'pass'){
  				console.log("reckoon created...."+data['id']);
  				console.log("reckoon created message...."+data['message']);
  				let reckoonId = data['id'];
  				let reqValueData = {reckoonId:reckoonId,"message":this.comment,"commentType":"COMMENT"};
  				this.restProvider.addReckoonComment(reqValueData).then(data => {
  					console.log("Data from feed req:"+JSON.stringify(reqValueData));
  					if(data['status'] == 'pass'){
  						let toast = Toast.create({
  							message: 'reckoon created ',//+data['message'],
  							duration: 2000
  						});

  						toast.onDismiss(() => {
  							console.log('Dismissed toast');
  						});

  						this.nav.present(toast);
  						this.nav.setRoot(HomePage);
  					}
  				});
  				
  			} else {
  				console.log("Error: in reckoon create...."+ JSON.stringify(data));
  				let toast = Toast.create({
  					message: 'error creating reckoon',
  					duration: 3000,
  					showCloseButton: true,
  					closeButtonText: 'close'
  				});

  				toast.onDismiss(() => {
  					console.log('Dismissed toast');
  				});

  				this.nav.present(toast);
  			}
  		});
  	}
}
