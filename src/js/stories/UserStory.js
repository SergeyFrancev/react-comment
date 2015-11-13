'use strict';

import server from '../utils/dummyServer.js';
import Dispatcher from '../dispatchers/dispatcher.js';
import User from '../models/User.js';

class UserStory extends Dispatcher {
	constructor(){
		super();
		this._user = null;
	}

	set user(user){
		this._user = new User(user);
		this.emit('change');
	}

	get user(){
		if(this._user === null){
			server.getUser(user => this.user = user);
			this._user = new User();
		}

		return this._user;
	}
}

export default UserStory;