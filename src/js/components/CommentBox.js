import React from 'react';
import CommentStory from '../stories/CommentStory.js';
import UserStory from '../stories/UserStory.js';
import CommentView from './Comment.js';
import CommentForm from './CommentForm.js';

class CommentBox extends React.Component {
	constructor(props){
		super(props);

		this.commentStory = new CommentStory();
		this.userStory = new UserStory();

		this.state = {
			comments: this.commentStory.comments,
			user: this.userStory.user,
			hasMore: true,
			replyOn: null,
			editOn: null
		};

		this.commentStory.on("change")
			.subscribeOnNext(this.updateComments.bind(this));

		this.userStory.on("change")
			.subscribeOnNext(this.updateUser.bind(this));

		this.commentStory.loadMore();
	}

	updateUser(){
		this.setState({
			user: this.userStory.user
		});
		super.forceUpdate();
	}

	updateComments(){
		this.setState({
			comments: this.commentStory.comments,
			hasMore: this.commentStory.hasMore || false
		});
	}

	handlerSave(e, comment){
		console.log(comment);
		this.commentStory.saveComment(comment);
		this.resetFormComment();
	}

	static handlerAuth(){
		console.log('auth');
	}

	createNewComment(){
		return this.commentStory.createComment(this.state.user);
	}

	handlerFocus(e, comment){
		if([this.state.editOn, this.state.replyOn].indexOf(comment) !== -1)
			this.resetFormComment();
	}

	static handlerDropComment(e, comment){
		this.commentStory.drop(comment);
		e.stopPropagation();
	}

	resetFormComment(){
		this.setState({
			replyOn: null,
			editOn: null
		});
	}

	handlerEditComment(e, comment){
		this.resetFormComment();
		this.setState({editOn: comment});
		e.stopPropagation();
	}

	handlerReplyComment(e, comment){
		if(comment !== this.state.replyOn){
			this.resetFormComment();
			this.setState({replyOn: comment});
		}
		e.stopPropagation();
	}

	renderCommentForm(setting = {parent: null, primary: false, getNewComment: false}){
		if(this.state.user.id !== null){
			let comment = setting.comment;
			let props = {
				key: 'comment-form-i-' + comment.id + '-' +((setting.isChild) ? setting.parent.id : 'null'),
				onSend: this.handlerSave.bind(this),
				parent: setting.parent,
				user: this.state.user,
				comment: comment,
				getNewComment: setting.getNewComment
			};

			if(setting.primary)
				props.onFocus = this.resetFormComment.bind(this);

			return CommentForm(props);
		}
		else{
			return React.createElement("div", {className: 'c-auth'},
				React.createElement("a", {className: "auth-link", onClick: this.handlerAuth}, "Авторизуйтесь"),
				", чтобы оставить комментарий"
			)
		}
	}

	renderComments(){
		let comments = [];
		for(let i = 0; i < this.state.comments.length; i++){
			let comment = this.state.comments[i];

			if(comment === this.state.editOn){
				comments.push(this.renderCommentForm({comment: comment}));
			}
			else{
				let conf = {
					key: 'comment-' + comment.id,
					comment: comment,
					user: comment.user,
					onReply: ((e) => this.handlerReplyComment(e, comment)),
					onEdit: ((e) => this.handlerEditComment(e, comment)),
					onDrop: ((e) => this.handlerDropComment(e, comment))
				};
				comments.push(CommentView(conf));
			}

			if(comment === this.state.replyOn){
				let settingForm = {
					parent: comment,
					comment: this.createNewComment(),
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
				this.renderCommentForm({
					comment: this.createNewComment(),
					primary: true,
					getNewComment: this.createNewComment.bind(this)
				}),
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