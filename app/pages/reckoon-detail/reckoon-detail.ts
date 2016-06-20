import {Page, NavController,NavParams} from 'ionic-angular';
import {TextShort} from '../../pipes/TextShort';
import {TimeAgoPipe,DateFormatPipe,DurationPipe} from 'angular2-moment';
import {DataProvider} from '../../providers/data-provider/data-provider';

/*
  Generated class for the ReckoonDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/reckoon-detail/reckoon-detail.html',
  providers:[DataProvider],
  pipes:[TextShort,TimeAgoPipe,DateFormatPipe,DurationPipe]
})
export class ReckoonDetailPage {
	public data = {};
	public comments = [];
  constructor(public restProvider: DataProvider,public nav: NavController,public navPrams: NavParams) {
 	let reckoonId = navPrams.get('data').reckoonId;
 	let type = "ALL";
 	console.log("reckooid:"+reckoonId);
  	this.restProvider.loadReckoonDetails(reckoonId).then(data => {this.data  = data; console.log("Data:"+JSON.stringify(this.data)); });
  	this.restProvider.loadComments(reckoonId,type).then(data => {this.comments  = data; console.log("comments:"+JSON.stringify(this.comments)); });
  	//this.data = this.restProvider.data;
  }
}
