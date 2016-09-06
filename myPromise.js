function MyPromise () {
	var success, error, promise;
	
	this.then =  function(successCallBack,errorCallback) {
		promise = new MyPromise(); // Creating new promise for chaning the promises.
		
		if (typeof  successCallBack === 'function') {
			success = successCallBack.bind(promise); // point 'this' to new promise
		}
		if (typeof  errorCallback === 'function') {
			error = errorCallback.bind(promise);
		}
		
		return promise;
	}

	this.resolve =  function(param) {
		if (typeof  success === 'function') {
			success(param);
		}
	}

	this.reject = function(reason) {
		if (typeof  error === 'function') {
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