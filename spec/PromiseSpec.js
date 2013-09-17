describe('Promise', function() {
  var promise, callback;

  beforeEach(function() {
    promise = new Promise();
    callback = jasmine.createSpy();
  });

  describe('#resolve', function(){

    it('it should immediately call all callbacks', function(){
      promise.success(callback);
      promise.resolve('hello');
      expect(callback).toHaveBeenCalledWith('hello');
    });

    it('should only allow one call', function(){
      promise.resolve('test');
      var resolving = function(){ promise.resolve('test'); };
      expect(resolving).toThrow(new Error('already resolved'));
    });
  });

  describe('#success', function() {

    describe('when the promise has been resolved', function(){
      it('should call any success callbacks immediately', function() {
        promise.resolve('hello');

        callback = jasmine.createSpy();
        promise.success(callback);
        expect(callback).toHaveBeenCalledWith('hello');
      });
    });

    describe('when the promise has not been resolved', function(){
      it('should add to callbacks but not call anything', function() {
        callback = jasmine.createSpy();
        promise.success(callback);
        expect(callback).not.toHaveBeenCalled();
        expect(promise.callbacks.length).toBe(1);
      });
    });
  });
});