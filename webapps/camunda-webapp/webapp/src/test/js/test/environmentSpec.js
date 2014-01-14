describe('The testing environment', function() {
  'use strict';
  /* global karma: true */

  it('loads', function() {
    expect(window).toBeDefined();
    expect(window.__karma__).toBeDefined();
    expect(__karma__).toBeDefined();
  });
});
