import React from 'react';
import UserStory from '../stories/UserStory.js';

class Comment extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			comment: props.comment,
			isEdit: false,
			isShowFull: false,
			countVideo: 0
		};
		this._user = null;
		this.setUser(props.user);
	}

	renderMessage(){
		var out = this.state.comment.message;
		for(var i = 0; i < this.props.messageRenderer.length; i++)
			out = this.props.messageRenderer.render.call(this, 'message', out);
		return out;
	}

	renderHeader(){
		var out = [];
		for(var i = 0; i < this.props.messageRenderer.length; i++)
			out = this.props.messageRenderer.render.call(this, 'header', out);
		return out;
	}

	renderButtons(){
		let buttons = [];
		if(this.user !== null){
			buttons.push(React.createElement("a", {
				key: "comment-reply-" + this.id,
				onClick: this.props.onReply,
				href: '#'
			}, "Ответить"));

			if(this.props.canEdit && !this.state.isEdit)
				buttons.push(React.createElement("a", {
					key: "comment-edit-" + this.id,
					onClick: this.props.onEdit,
					href: '#',
					className: 'edit-button'
				}, "Редактировать"));

			if(this.props.canDrop)
				buttons.push(React.createElement("a", {
					key: "comment-drop-" + this.id,
					onClick: this.props.onDrop,
					href: '#',
					className: 'drop-button'
				}, "Удалить"));
		}
		if(this.hasFadedPart){
			buttons.push(React.createElement("span", {
				key: "comment-full-" + this.id,
				className: 'sh-more' + ((this.state.isShowFull) ? " op" : ""),
				onClick: this.handlerShowFull
			}));
		}

		return buttons;
	}

	handlerShowFull(){}

	get hasFadedPart(){
		return this.props.fadeLength > 0 && (this.state.comment.length >= this.props.fadeLength || this.state.countVideo > 1);
	}

	get avatar(){return this._user.avatar;}

	get userName(){return this._user.userName;}

	get userId(){return this._user.userId;}

	setUser(user){
		this._user = user;
	}

	render(){
		var classes = ['c-i'], fade = '', classMess = ['c-t'],
			messageContent = this.renderMessage();
		if(this.state.comment.parent_id !== null)
			classes.push('second');

		if(this.hasFadedPart){
			if(!this.state.isShowFull)
				classMess.push('faded');
		}

		return (
			React.createElement("div", {className: classes.join(" ")},
				React.createElement("div", {className: 'ava'}, React.createElement("img", {src: this.avatar})),
				React.createElement("div", {className: classMess.join(' ')},
					React.createElement("div", {className: 'c-h'},
						React.createElement("div", {className: 'u-n'}, this.userName),
						React.createElement("div", {className: 'c-d', ref: 'dateComment', title: this.state.comment.created})
					),
					React.createElement("div", {className: 'm-t'}, messageContent),
					React.createElement("div", {className: 'fade grd grd-ie'}),
					React.createElement("div", {className: 'c-r'}, this.renderButtons())
				)
			)
		);
	}
}

Comment.defaultProps = {
	id: null,
	user: {},
	comment: {},
	messageRenderer: [],
	onReply: function(){},
	onEdit: function(){},
	onDrop: function(){},
	fadeLength: 255
};

export default React.createFactory(Comment);