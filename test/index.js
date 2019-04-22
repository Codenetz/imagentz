import { expect } from 'chai';

describe('#test', function() {
  it('should return true', function() {
    expect((() => true)()).to.equal(true);
  });
});
