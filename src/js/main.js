var React = window.React = require('react');
    Message = require('./Message.jsx'),
    element = document.getElementById('example');


React.render(<Message name="John" />, element);
