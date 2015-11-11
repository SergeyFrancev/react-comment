'use strict';

import server from '../utils/dummyServer.js';
import Dispatcher from '../dispatchers/dispatcher.js';

class UserStory extends Dispatcher {
	constructor(){
		super();
		this._user = null;
	}

	set user(user){
		this._user = user;
		this.emit('change');
	}

	get user(){
		if(!this._user){
			if(this._user === null)
				server.getUser(user => this.user = user);
			this._user = false;
			return null;
		}
		else
			return this._user;
	}
}

let storeInstance = new UserStory();

export default storeInstance;