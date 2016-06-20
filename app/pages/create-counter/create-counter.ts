import {Page, Toast, NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {DataProvider} from '../../providers/data-provider/data-provider';
/*
  Generated class for the CreateCounterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Page({
  	templateUrl: 'build/pages/create-counter/create-counter.html',
  	providers:[DataProvider],
  })
  export class CreateCounterPage {
  	public reckoonName ='';
  	public reckoonUnit ='';
  	public visibility = true;
  	public value = '';
  	public type = 'COUNTER';
  	constructor(public restProvider: DataProvider,public nav: NavController) {}


  	createReckoon(){
  		let vis = this.visibility ? 'PUBLIC' : 'PRIVATE';
  		let reqData = {"unit":this.reckoonUnit,
  		"message":this.reckoonName, 
  		"type":this.type, "visibility":vis}
  		this.restProvider.createReckoon(reqData).then(data => {
  			console.log("Data from feed req:"+JSON.stringify(reqData));
  			if(data['status'] == 'pass'){
  				console.log("reckoon created...."+data['id']);
  				console.log("reckoon created message...."+data['message']);
  				let reckoonId = data['id'];
  				let reqValueData = {reckoonId:reckoonId,"message":this.value,"commentType":"VALUE"};
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

