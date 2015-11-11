'use strict';

import Rx from 'rxjs';

class Dispatcher {
	constructor(){
		this.subject = new Rx.Subject();
	}

	on(event){
		return this.subject
			.filter(function(data){return data.action && data.action == event})
			.map(function(data){return data.data || {};})
	}

	emit(event, data){
		data = data || {};
		this.subject.onNext({action: event, data: data});
	}
}

export default Dispatcher;