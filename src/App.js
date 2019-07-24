import React from 'react';

const ADRESS = 'http://content.guardianapis.com/search?api-key=test';

const getData = async(link) => {
  const response = await fetch(link);
  const posts = await response.json();

  return posts;
};

class App extends React.Component {
  state = {
    data: [],
    error: false,
  }

  async componentDidMount() {
    const webData = await getData(ADRESS)
      .catch(() => this.setState({ error: true }));

    this.setState(prevState => ({
      data: !prevState.error ? webData.response.results : [],
    }));
  }

  render() {
    return (
      <div className="App">
        <div className="img-container">
          <img
            src="images/Head.png"
            alt="Head logo"
          />
        </div>
        {this.state.error
          ? (
            <div className="error">
              OOPS, something went wrong, Failed to load data :(
            </div>
          )
          : (
            <ul className="post-container">

              {this.state.data.map(item => (
                <li className="post-item">

                  <ul>
                    <p>
                      <span>{item.webPublicationDate.slice(0, 10)}</span>
                      <span className="topic">{item.sectionName}</span>
                    </p>
                    <h3>
                      <a href={item.webUrl}>{item.webTitle}</a>
                    </h3>
                  </ul>

                </li>
              ))}
            </ul>
          )}
      </div>
    );
  }
}

export default App;
