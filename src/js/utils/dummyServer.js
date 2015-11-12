/**
 * Created by hector on 11.11.15.
 */
'use strict';

import Rx from 'rxjs';
//import Promise from 'babel-polyfill';

export default {
	getMessages: function(callback){
		setTimeout(function(){
			callback(
				{
					"comments": [{
						"id": "35744",
						"userName": "User 1",
						"userId": "10320",
						"avatar": "/img/ava.jpg",
						"created": "2015-11-08T01:09:01-0500",
						"message": "alala ololo http://vk.com",
						"canEdit": false,
						"canDelete": true,
						"parent_id": null
					}, {
						"id": "35749",
						"userName": "User 2",
						"userId": "7980",
						"avatar": "/img/ava.jpg",
						"created": "2015-11-08T06:49:48-0500",
						"message": "test message",
						"canEdit": false,
						"canDelete": false,
						"parent_id": "35743"
					}, {
						"id": "35743",
						"userName": "User 2",
						"userId": "17135",
						"avatar": "/img/ava.jpg",
						"created": "2015-11-07T19:12:09-0500",
						"message": "ololoshi",
						"canEdit": true,
						"canDelete": true,
						"parent_id": null
					}],
					"hasMore": false
				}
			);
		}, 500);
	},
	getUser: function(callback){
		setTimeout(function(){
			callback({
				"name": "HectorTwist",
				"avatar": "/img/ava.jpg",
				"id": "3341"
			});
		}, 500);
	}
}
