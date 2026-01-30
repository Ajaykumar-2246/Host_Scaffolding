import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      <h2>About</h2>
      <p>This is a Micro Frontend Host built with:</p>
      <ul>
        <li>React 18</li>
        <li>TypeScript</li>
        <li>Webpack 5 Module Federation</li>
        <li>React Router</li>
      </ul>
    </div>
  );
};

export default AboutPage;
