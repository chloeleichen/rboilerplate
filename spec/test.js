var React = window.React = require('react/addons');
var Message = require('./../src/js/Message.jsx');
var TestUtils = React.addons.TestUtils;

describe("Message", function() {
  var component;
  beforeEach(function(){
    //pay attention to the syntax below
    component = TestUtils.renderIntoDocument(React.createElement(Message, {name: "John"}));
  });
  it("should render correct name", function() {
    expect(component.getDOMNode().textContent).toMatch(' Hi John');
  });
});
