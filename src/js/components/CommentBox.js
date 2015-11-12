import React from 'react';
import CommentStory from '../stories/CommentStory.js';
import UserStory from '../stories/UserStory.js';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';

class CommentBox extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			comments: CommentStory.comments,
			user: UserStory.user,
			hasMore: true,
			replyOn: null,
			editOn: null
		};

		CommentStory.on("change")
			.subscribeOnNext(data => this.updateComments());

		UserStory.on("change")
			.subscribeOnNext(data => this.setState({user: UserStory.user}));

		CommentStory.loadMore();
	}

	updateComments(){
		this.setState({
			comments: CommentStory.comments,
			hasMore: CommentStory.hasMore || false
		});
	}

	handlerSave(commentData){
		console.log('save comment', commentData);
	}

	handlerAuth(){
		console.log('auth');
	}

	handlerFocus(){
		this.setState({
			replyOn: null,
			editOn: null
		})
	}

	renderCommentForm(comment = {parent_id: null, id: null, forUser: null}){
		if(this.state.user){
			let props = {
				key: 'comment-form-p-' + comment.parent_id + '-i-' + comment.id,
				onSend: this.handlerSave,
				onFocus: this.handler,
				parent_id: comment.parent_id,
				id: comment.id
			};
			return CommentForm(props);
		}
		else{
			return React.createElement("div", {className: 'c-auth'},
				React.createElement("a", {className: "auth-link", onClick: this.handlerAuth}, "Авторизуйтесь"),
				", чтобы оставить комментарий"
			)
		}
	}

	handlerDropComment(){

	}

	handlserEditComment(){

	}

	handlerReplyComment(e, comment){
		this.setState({replyOn: comment});
		e.stopPropagation();
	}

	renderComments(){
		let comments = [];
		for(let i = 0; i < this.state.comments.length; i++){
			let comment = this.state.comments[i];
			comment.key = 'comment-' + comment.id;
			comment.onReply = ((e) => this.handlerReplyComment(e, comment));
			comments.push(Comment(comment));

			if(comment === this.state.replyOn)
			{
				let settingForm = {
					parent_id:comment.id,
					forUser: comment.userName,
					isFocus: true
				};

				comments.push(this.renderCommentForm(settingForm));
			}
		}

		return comments;
	}

	render(){

		//if(this.state.hasMore){
		//	comments.push(React.createElement("div", {
		//		className: 'more-comments',
		//		onClick: this.handlerMore
		//	}, ((!this.state.isLoadMore) ? "Показать ещё" : '...')));
		//}
		//var o = _.clone(((_.isNull(this.state.user) ? {} : this.state.user)));
		//o.onFocus = this.handlerFocus.bind(this);
		//o.onSend = this.handlerSend.bind(this, undefined);
		//o.fileUpload = this.props.fileUpload;
		return (
			React.createElement("div", {className: 'c-s'},
				this.renderCommentForm(),
				this.renderComments()
			)
		);
	}
}

CommentBox.defaultProps = {
	fileUpload: false,
	parseVideo: false
};

export default CommentBox;