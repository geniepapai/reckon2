import {Page, NavController, NavParams} from 'ionic-angular';
import {DataProvider} from '../../providers/data-provider/data-provider';
import {TimeAgoPipe,DateFormatPipe,DurationPipe} from 'angular2-moment';
import {Camera} from 'ionic-native';
/*
  Generated class for the ProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Page({
  	templateUrl: 'build/pages/profile/profile.html',
  	providers:[DataProvider],
  	pipes:[TimeAgoPipe,DateFormatPipe,DurationPipe]
  })
  export class ProfilePage {
  	data = {};
  	profileData =  {};
  	public base64Image: string;
  	constructor(public restProvider: DataProvider,public nav: NavController, public navParams: NavParams) {
  		this.data = navParams.get('data');
  		//this.callProfile(this.data);
  		this.restProvider.getProfile(this.data['userId']).then(data => {
  			console.log("Data from profile req:"+JSON.stringify(data));
  			if(!data){
  				console.log("No data for profile , this is strange....");
  			} else {

  				this.profileData  = data['data']; 
  				//console.log("Data from profile data req:"+this.profileData['username']);
  			}
  		});
  	}

  	callProfile(data){
  		this.restProvider.getProfile(data.userId).then(data => {
  			console.log("Data from profile req:"+JSON.stringify(data));
  			if(!data){
  				console.log("No data for profile yet, this is strange....");
  			} else {
  				this.profileData  = data; 
  			}
  		});

  	}
  	takePicture(){
  		var options = {
  			quality: 75,
  			destinationType: Camera.DestinationType.DATA_URL,
  			sourceType: Camera.PictureSourceType.CAMERA,
  			allowEdit: true,
  			encodingType: Camera.EncodingType.JPEG,
  			targetWidth: 300,
  			targetHeight: 300,
  			saveToPhotoAlbum: false
  		};
  		Camera.getPicture(options).then((imageData) => {
		 // imageData is either a base64 encoded string or a file URI
		 // If it's base64:
		 this.base64Image = "data:image/jpeg;base64," + imageData;
		}, (err) => {
		});
  	}
  }
