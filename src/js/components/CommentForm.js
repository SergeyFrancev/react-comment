/**
 * Created by hector on 12.11.15.
 */
'use strict';

import React from 'react';

const maxLengthMessage = 150;

class CommentForm extends React.Component {
	constructor(props){
		super();
		this.state = {
			isFocus: props.isFocus,
			isLoading: false,
			comment: props.comment
		};
	}

	handlerChange(e){
		if(!this.state.isLoading){
			this.state.comment.message = e.target.value;
			this.setState({comment: this.state.comment});
		}
	}

	handlerFocus(e){
		this.setState({
			isFocus: (e.type == "focus")
		});
		this.props.onFocus(e, this.state.comment);
	}

	handlerKeyDown(e){

	}

	handlerSave(e){
		if(this.state.comment.length > 0 && !this.state.isLoading){
			if(this.props.parent != null){
				if(this.props.parent.isChild)
					this.state.comment.parent_id = this.props.parent.parent_id;
				else
					this.state.comment.parent = this.props.parent;
			}
			this.props.onSend(e, this.state.comment);

			if(this.props.getNewComment)
				this.setState({comment: this.props.getNewComment()});
		}
	}

	get isReply(){
		return (this.state.comment.isChild || this.props.parent !== null);
	}

	render(){
		if(this.state.user === null)
			return '';

		let classes = ['c-i comment-new'],
			limit = '',
			limitClass = ['char-counter trns-2'];

		if(this.isReply)
			classes.push('reply-comment second');
		else
			classes.push('c-a-s');

		if(this.state.comment.length > 0)
			classes.push('focus');

		if(maxLengthMessage >= this.state.comment.length)
			limit = maxLengthMessage - this.state.comment.length;

		if(!this.state.isFocus || maxLengthMessage < this.state.comment.length)
			limitClass.push('hidden');

		return React.createElement("div", {className: classes.join(" ")},
			React.createElement("div", {className: 'ava'}, React.createElement("img", {src: this.state.comment.avatar})),
			React.createElement("div", {className: 'c-t-b'},
				React.createElement("div", {className: 't-b-h shadow-inner'},
					React.createElement("label", {}, "Введите текст комментария"),
					React.createElement("textarea", {
						className: 'comment-message',
						ref: 'message',
						value: this.state.comment,
						onChange: this.handlerChange.bind(this),
						onFocus: this.handlerFocus.bind(this),
						onBlur: this.handlerFocus.bind(this),
						onKeyDown: this.handlerKeyDown
					})
				)
			),
			React.createElement("div", {className: 'c-underbar'},
				React.createElement("div", {className: limitClass.join(" ")},
					React.createElement("span", {className: 'limit-text'}, "Рекомендуемый объем знаков:"),
					React.createElement("span", {id: 'charNum'}, limit)
				),
				React.createElement("div", {className: 'c-btn-holder'},
					React.createElement("button", {
							className: 'btn',
							disabled: (this.state.comment.length < 1),
							onClick: this.handlerSave.bind(this)/*,
							onMouseDown: this.handlerSave.bind(this)*/
						},
						React.createElement("i", {},
							((!this.props.isEdit) ? "Отправить" : "Сохранить")
						)
					)
				)
			)
		);
	}
}
CommentForm.defaultProps = {
	primary: false,
	parent: null,
	user: null,
	comment: null,
	isFocus: false,
	getNewComment: false,
	onFocus: function(){},
	onSend: function(){}
};

export default React.createFactory(CommentForm);
export {CommentForm as component};