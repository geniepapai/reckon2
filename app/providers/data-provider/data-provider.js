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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
var DataProvider = (function () {
    function DataProvider(http) {
        this.http = http;
        this.loginURL = '/login';
        this.feedURL = "/user/feed";
        this.RECKOON_URL = "http://localhost:3000/api"; // URL to web api
        //details of user +111313131313 @todo get dynamically
        this.USER_ID = "NSRdJ7z3LpcctTXZL";
        this.USER_TOKEN = "BUoHNbmBMc3I90nLMJ6YuH-IoVwDfKQUYwpSC1s0vIg";
        this.data = null;
    }
    DataProvider.prototype.getUserFeed = function () {
        var _this = this;
        var headers = new http_1.Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": this.USER_TOKEN,
            "X-User-Id": this.USER_ID
        });
        var options = new http_1.RequestOptions({ headers: headers });
        // construct the URL, adding the search term to the url
        var url = this.RECKOON_URL + this.feedURL;
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }
        // don't have the data yet
        return new Promise(function (resolve) {
            // We're using Angular Http provider to request the data,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the data and resolve the promise with the new data.
            _this.http.get(url, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                // we've got back the raw data, now generate the core schedule data
                // and save the data for later reference
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    DataProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataProvider);
    return DataProvider;
}());
exports.DataProvider = DataProvider;
