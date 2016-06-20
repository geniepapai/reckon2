"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_angular_1 = require('ionic-angular');
var data_provider_1 = require('../../providers/data-provider/data-provider');
var TextShort_1 = require('../../pipes/TextShort');
var HomePage = (function () {
    function HomePage(restProvider, nav) {
        this.restProvider = restProvider;
        this.nav = nav;
        this.me = { screenName: '', message: '', unit: '' };
        this.feedData = [];
        this.feedData = [{ screenName: 'where', unit: 'hours', message: 'where is mycheese' },
            { screenName: 'where2', unit: 'calories', message: 'burn baby burn!' }];
        //this.feedData = this.restProvider.getUserFeed();
    }
    HomePage.prototype.addCard = function () {
        var addMe = this.me;
        this.feedData.push(addMe);
    };
    HomePage.prototype.showDetail = function (message) {
        var addMe = this.me;
        this.feedData.push(addMe);
    };
    HomePage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/home/home.html',
            providers: [data_provider_1.DataProvider],
            pipes: [TextShort_1.TextShort]
        }), 
        __metadata('design:paramtypes', [data_provider_1.DataProvider, ionic_angular_1.NavController])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
