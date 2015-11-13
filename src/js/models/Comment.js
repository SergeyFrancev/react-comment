/**
 * Created by hector on 12.11.15.
 */
'use strict';
import User from './User.js';

class Comment {
	constructor(config){
		if(!(config.user instanceof User))
			throw new Error("Param user should be instance User");

		this.id = config.id || null;
		this.user = config.user;
		this.message = config.message || '';
		this.created = config.created;
		this.parent_id = config.parent_id || null;
		this._canEdit = config.canEdit;
		this._canDrop = config.canDrop;
	}

	canEdit(user){return this._canEdit && user.id == this.userId}

	get canDrop(){return this._canDrop}

	get userName(){return this.user.userName}

	get avatar(){return this.user.avatar}

	get userId(){return this.user.id}

	get length(){return this.message.length}

	get isChild(){return (this.parent_id !== null)}

	set parent(comment){
		if(comment === null)
			this.parent_id = null;
		else
			this.parent_id = comment.id;
	}

	toString(){return this.message}
}

export default Comment;