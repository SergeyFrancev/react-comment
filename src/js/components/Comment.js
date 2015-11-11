import React from 'react';
import UserStory from '../stories/UserStory.js';

class Comment extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			message: props.message,
			isEdit: false,
			isShowFull: false,
			countVideo: 0,
			user: UserStory.user
		};
		UserStory.on('change')
			.subscribeOnNext(data => this.setState({user: UserStory.user}));
	}

	renderMessage(){
		var out = this.state.message;
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
				key: "comment-reply-"+this.id,
				onClick: this.props.onReply,
				href: '#'
			}, "Ответить"));

			if(this.props.canEdit && !this.state.isEdit)
				buttons.push(React.createElement("a", {
					key: "comment-edit-"+this.id,
					onClick: this.props.onEdit,
					href: '#',
					className: 'edit-button'
				}, "Редактировать"));

			if(this.props.canDrop)
				buttons.push(React.createElement("a", {
					key: "comment-drop-"+this.id,
					onClick: this.props.onDrop,
					href: '#',
					className: 'drop-button'
				}, "Удалить"));
		}
		if(this.hasFadedPart){
			buttons.push(React.createElement("span", {
				key: "comment-full-"+this.id,
				className: 'sh-more' + ((this.state.isShowFull) ? " op" : ""),
				onClick: this.handlerShowFull
			}));
		}

		return buttons;
	}

	renderFiles(){
		return '';
	}

	handlerShowFull(){}

	get hasFadedPart(){
		return this.props.fadeLength > 0 && (this.props.message.length >= this.props.fadeLength || this.state.countVideo > 1);
	}

	render(){
		var classes = ['c-i'], fade = '', classMess = ['c-t'],
			messageContent = this.renderMessage();
		if(this.props.parent_id !== null)
			classes.push('second');

		if(this.hasFadedPart){
			if(!this.state.isShowFull)
				classMess.push('faded');
		}

		return (
			React.createElement("div", {className: classes.join(" ")},
				React.createElement("div", {className: 'ava'}, React.createElement("img", {src: this.props.avatar})),
				React.createElement("div", {className: classMess.join(' ')},
					React.createElement("div", {className: 'c-h'},
						React.createElement("div", {className: 'u-n'}, this.props.userName),
						React.createElement("div", {className: 'c-d', ref: 'dateComment', title: this.props.created})
					),
					React.createElement("div", {className: 'm-t'}, messageContent),
					this.renderFiles(),
					React.createElement("div", {className: 'fade grd grd-ie'}),
					React.createElement("div", {className: 'c-r'}, this.renderButtons())
				)
			)
		);
	}
}

Comment.defaultProps = {
	id: null,
	userName: 'None',
	userId: null,
	avatar: '/img/ava.jpg',
	created: null,
	message: 'None',
	canEdit: false,
	canDelete: false,
	parent_id: null,
	messageRenderer: [],
	onReply: function(){},
	onEdit: function(){},
	onDrop: function(){},
	fadeLength: 255
};

export default React.createFactory(Comment);