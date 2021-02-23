import React from 'react';
import * as api from '../api';

class Videos extends React.Component {
  state = {
    isLoading: true,
    video: null,
  };

  componentDidMount() {
    this.fetchVideos();
    return 'It works';
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <p>Loading video...</p>;
    }
    return <p>Its finished loading</p>;
  }

  fetchVideos() {
    console.log("This is when we'd fetch the videos");
    // .then(() => {
    // api.getVideos(videos).then();
    // this.setState({ isLoading: false });
    // });
  }
}

export default Videos;
