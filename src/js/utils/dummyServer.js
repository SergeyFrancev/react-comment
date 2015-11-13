/**
 * Created by hector on 11.11.15.
 */
'use strict';

import Rx from 'rxjs';
//import Promise from 'babel-polyfill';

export default {
	getMessages: function(callback, lastId = null){
		setTimeout(function(){
			callback(
				{
					"comments": [{
						"id": "35744",
						user: {
							name: "User 1",
							avatar: "/img/ava.jpg",
							id: "10320"
						},
						"created": "2015-11-08T01:09:01-0500",
						"message": "alala ololo http://vk.com",
						"canEdit": false,
						"canDelete": true,
						"parent_id": null
					}, {
						"id": "35749",
						user: {
							name: "User 3",
							avatar: "/img/ava.jpg",
							id: "7980"
						},
						"created": "2015-11-08T06:49:48-0500",
						"message": "test message",
						"canEdit": false,
						"canDelete": false,
						"parent_id": "35744"
					}, {
						"id": "35743",
						user: {
							name: "User 2",
							avatar: "/img/ava.jpg",
							id: "17135"
						},
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
