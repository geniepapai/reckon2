import {Page, NavController} from 'ionic-angular';
import {CreateCounterPage} from '../create-counter/create-counter';
import {CreateCountdownPage} from '../create-countdown/create-countdown';
import {CreateCountupPage} from '../create-countup/create-countup';
/*
  Generated class for the CreateReckoonChoosePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/create-reckoon-choose/create-reckoon-choose.html',
})
export class CreateReckoonChoosePage {
  constructor(public nav: NavController) {}

  createCounter(){
  	this.nav.push(CreateCounterPage);
  }
  createCountdown(){
  	this.nav.push(CreateCountdownPage);
  }
  createCountup(){
  	this.nav.push(CreateCountupPage);
  }
}
