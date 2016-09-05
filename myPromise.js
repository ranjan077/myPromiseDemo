function MyPromise () {
	var success = function() {};
	var error = function() {};
	var promise;
	return {
		then: function(successCallBack,errorCallback) {
			promise = new MyPromise(); // Creating new promise for chaning the promises.
			
			if (typeof  successCallBack === 'function') {
				success = successCallBack.bind(promise); // point 'this' to new promise
			}
			if (typeof  errorCallback === 'function') {
				error = errorCallback.bind(promise);
			}
			
			return promise;
		},
		resolve: function(param) {
			success(param);
		},
		reject: function(reason) {
			error(reason);
		}
	}
}



function AsyncDemo() {
	var p1 = new MyPromise();
	setTimeout(function(){
		Math.floor(Math.random()*101)%2 == 0 ? p1.resolve('hurray!!') : p1.reject('sad!!');
	}, 1000);
	return p1;
}

AsyncDemo().then(function(param) {
	console.log('Async operation done: ' + param);
	var that = this;
	setTimeout(function(){
		Math.floor(Math.random()*101)%2 == 0 ? that.resolve('hurray!!') : that.reject('sad!!');
	}, 1000);
	
}, function(reason) {
	console.log('Async call failed:' + reason);
}).then(function(param) {
	console.log('Async2 operation done: ' + param);
	var that = this;
	setTimeout(function(){
		Math.floor(Math.random()*101)%2 == 0 ? that.resolve('hurray!!') : that.reject('sad!!');
	}, 1000);
},function(reason) {
	console.log('Async2 call failed:' + reason);
}).then(function(param) {
	console.log('Async3 operation done: ' + param);
},function(reason) {
	console.log('Async3 call failed:' + reason);
});