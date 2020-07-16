import * as React from 'react';

class NotFoundPage extends React.Component<{}> {
  render() {
    return (
      <div className="not-found">
        <h1>Looks like you're lost...</h1>
        {/* <h4><a>Return to the wind forecast</a></h4> */}
        <div className="wind-direction"></div>
      </div>
    );
  }
}

export default NotFoundPage;
