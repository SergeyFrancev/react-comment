/**
 * Created by hector on 12.11.15.
 */
'use strict';

import React from 'react';
import UserStory from '../stories/UserStory.js';

const maxLengthMessage = 150;

class CommentForm extends React.Component {
	constructor(props){
		super(props);
		let mes = '';
		if(props.forUser !== null)
			mes = props.forUser + ', ';

		this.state = {
			message: mes + props.message,
			user: UserStory.user,
			isLoading: false,
			isFocus: props.isFocus
		};

		UserStory.on('change')
			.subscribeOnNext(data => this.setState({user: UserStory.user}));
	}

	handlerChange(e){
		if(!this.state.isLoading)
			this.setState({message: e.target.value});
	}

	handlerFocus(e){
		var o = {};
		o.isFocus = (e.type == "focus");
		this.setState(o);
	}

	handlerKeyDown(e){

	}

	handlerSend(){
		if(this.state.message.length > 0 && !this.state.isLoading)
		{
			var out = this.props;
			for(var i in this.state)
				if(this.state.hasOwnProperty(i))
					out[i] = this.state[i];
			this.props.onSend(out);
		}
	}

	render(){
		if(this.state.user === null)
			return '';

		var classes = ['c-i comment-new'],
			limit = '',
			limitClass = ['char-counter trns-2'];

		if(this.props.parent_id != null)
			classes.push('reply-comment second');
		else
			classes.push('c-a-s');

		if(this.state.message.length > 0)
			classes.push('focus');

		if(maxLengthMessage >= this.state.message.length)
			limit = maxLengthMessage - this.state.message.length;

		if(!this.state.isFocus || maxLengthMessage < this.state.message.length)
			limitClass.push('hidden');

		return React.createElement("div", {className: classes.join(" ")},
			React.createElement("div", {className: 'ava'}, React.createElement("img", {src: this.state.user.avatar})),
			React.createElement("div", {className: 'c-t-b'},
				React.createElement("div", {className: 't-b-h shadow-inner'},
					React.createElement("label", {}, "Введите текст комментария"),
					React.createElement("textarea", {
						className: 'comment-message',
						ref: 'message',
						value: this.state.message,
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
							disabled: (this.state.message.length < 1),
							onClick: this.handlerSend,
							onMouseDown: this.handlerSend
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
	id: null,
	parent_id: null,
	forUser: null,
	message: '',
	isFocus: false,
	onFocus: function(){},
	onSend: function(){}
};

export default React.createFactory(CommentForm);
export {CommentForm as component};