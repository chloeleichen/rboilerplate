var React = window.React = require('react/addons');
var Message = require('./../src/js/Message.jsx');
var TestUtils = React.addons.TestUtils;

describe("Message", function() {
  var component;
  beforeEach(function(){
    component = TestUtils.renderIntoDocument(React.createElement(<Message name="John"/>));
  });

  it("should render correct name", function() {
    expect(component.getDOMNode().textContent).toEqual('Hi John');
  });
});
