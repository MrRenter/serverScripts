var request = require('request');
var cheerio = require("cheerio");
var fs = require("fs");
var fileDir = "/media/usbhdd/desktopBackgrounds/";
var http = require("http");

var site = "http://www.dualmonitorbackgrounds.com";
var url = "http://www.dualmonitorbackgrounds.com/?latestImagesPage=1";
request(url, function(error, response, html) {
	if (!error && response.statusCode == 200){
//		console.log(html);
		var $ = cheerio.load(html);
		$("div#latest>ul>li").each(function(i, e){
			var link = $(e).find("a");
			var url = site + "/albums" + link.attr("href").split(".php")[0];
			var temp = link.attr("href").split(".php")[0].split("/");
			var filename = temp[temp.length-1];
			fs.exists(fileDir + filename, function(e){
				if (!e){
					console.log("Downloading " + filename);
					var file = fs.createWriteStream(fileDir + filename);
					var request = http.get(url, function(response){
						response.pipe(file);
					});
				}
			});
		});
	} else {
		console.log(error);
	}
});
