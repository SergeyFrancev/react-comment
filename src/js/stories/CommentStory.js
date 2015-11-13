'use strict';

import server from '../utils/dummyServer.js';
import Dispatcher from '../dispatchers/dispatcher.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

class CommentStory extends Dispatcher {
	constructor(){
		super();
		this._messages = [];
		this._lastId = null;
		this._hasMore = false;
	}

	_addComments(data){
		if('comments' in data){
			while(data.comments.length > 0){
				let comment = data.comments.shift();
				comment.user = new User(comment.user);
				this._messages.push(new Comment(comment));
			}
		}

		if(this._messages.length > 0)
			this._lastId = this._messages[this._messages.length - 1].id;

		this._hasMore = data.hasMore || false;
		this.emit('change');
	}

	loadMore(){
		server.getMessages(data => this._addComments(data), this._lastId);
	}

	addComment(comment){
		if(!comment.isChild)
			this._messages.push(comment);
		else{
			let isSearchParent = false,
				index = -1;

			for(let i in this._messages){
				let item = this._messages[i];
				if(item.id == comment.parent_id)
					isSearchParent = true;
				else if(isSearchParent && !item.isChild){
					index = i;
					break;
				}
			}

			if(index == -1)
				this._messages.push(comment);
			else{
				this._messages.splice(index, 0, comment);
			}
		}
		this.emit('change');
	}

	saveComment(comment){
		//Todo: send response save comment on server
		if(comment.id === null)
			comment.id = Math.floor(Math.random() * 1000);
		this.addComment(comment);
	}

	createComment(user){
		return new Comment({user: user});
	}

	drop(comment){
		//Todo send request drop comment
		let indexDrop = this._messages.indexOf(comment);
		if(indexDrop !== -1){
			this._messages = this._messages.splice(indexDrop, 1);
		}
	}

	get comments(){return this._messages}

	get hasMore(){return this._hasMore}
}

export default CommentStory;