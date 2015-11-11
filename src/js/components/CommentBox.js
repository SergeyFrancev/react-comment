import React from 'react';
import CommentStory from '../stories/CommentStory.js';
import Comment from './Comment.js';

class CommentBox extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			comments: [],
			hasMore: true
		};

		this.story = new CommentStory();
		this.story.on("change")
			.subscribeOnNext(data => this.updateComments());
		this.story.loadMore();
	}

	updateComments(){
		this.setState({
			comments: this.story.comments,
			hasMore: this.story.hasMore || false
		});
	}

	render(){
		var self = this, comments = [];
		for(var id in this.state.comments){
			let item = this.state.comments[id];
			item.key = 'comment-'+item.id;
			comments.push(Comment(item));
		}
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
				"TEST",
				comments
			)
		);
	}
}

CommentBox.defaultProps = {
	fileUpload: false,
	parseVideo: false
};

export default CommentBox;