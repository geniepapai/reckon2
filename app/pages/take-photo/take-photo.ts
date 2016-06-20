import {Page, NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';
/*
  Generated class for the TakePhotoPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Page({
  	templateUrl: 'build/pages/take-photo/take-photo.html',
  })
  export class TakePhotoPage {
  	constructor(public nav: NavController) {}


  	takePicture(){

  		Camera.getPicture(options).then((imageData) => {
		 // imageData is either a base64 encoded string or a file URI
		 // If it's base64:
		 let base64Image = "data:image/jpeg;base64," + imageData;
		}, (err) => {
		});
  	}
  }
