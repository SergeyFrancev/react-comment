/**
 * Created by hector on 12.11.15.
 */
'use strict';

class User {
	constructor(config = {id: null, name: 'None', avatar: ''}){
		this._user = {
			id: config.id,
			userName: config.name,
			avatar: config.avatar
		}
	}

	get userName(){return this._user.userName}
	get id(){return this._user.id}
	get avatar(){return this._user.avatar}
}

export default User;