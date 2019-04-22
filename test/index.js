import {expect} from 'chai';

let foo = () => {
  return null;
};

describe('#resource', function() {
  context('without arguments', function() {
    it('should return 0', function() {
      expect(foo()).to.equal(null);
    });
  });
});
