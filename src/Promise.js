var Promise = Promise || function(){
  this.callbacks = [];
};

Promise.prototype.success = function(callback){
  this.callbacks.push(callback);
  this.finalize();
};

Promise.prototype.resolve = function(value){
  if (this.value) throw new Error('already resolved');
  this.value = value;
  this.finalize();
};

Promise.prototype.finalize = function() {
  if (!this.value) return;

  for (var i = this.callbacks.length - 1; i >= 0; i--) {
    this.callbacks[i](this.value);
  };

  this.callbacks = [];
};

// var foo = new Promise();
// var bar = new Promise();

// foo.resolve('hello');

// setTimeout(function(){
//   bar.resolve('world');
// }, 500);

// foo.success(function(result){
//   console.log(result);
// });

// bar.success(function(result){
//   console.log(result);
// });