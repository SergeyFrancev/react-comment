'use strict';

import server from '../utils/dummyServer.js';
import Dispatcher from '../dispatchers/dispatcher.js';

class CommentStory extends Dispatcher {
	constructor(){
		super();
		this._messages = [];
		this._lastId = null;
		this._hasMore = false;
	}

	_addComments(data){
		if('comments' in data)
		{
			while(data.comments.length > 0)
				this._messages.push(data.comments.shift());
		}

		if(this._messages.length > 0)
			this._lastId = this._messages[this._messages.length - 1].id;

		this._hasMore = data.hasMore || false;
		this.emit('change');
	}

	loadMore(){
		server.getMessages(data => this._addComments(data));
	}

	saveComment(comment){

	}

	get comments(){return this._messages}

	get hasMore(){return this._hasMore}
}

export default CommentStory;