import React, { Component } from 'react';
import Logo from './components/Logo/Logo'
import Results from './components/Results/Results'
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      artist: 'drake',
      results: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)

  }

  
  handleSearch(e){
    if(e.keyCode === 13){
	    axios({
		    method: 'GET',
		    url: `https://itunes.apple.com/search?term=${this.state.artist}`
	    }).then(res => {
		    this.setState({results: res.data.results})
	    })
    }
  }

  handleChange(e) {
    this.setState({artist: e.target.value})
  }

  componentDidMount(){
	  axios({
		  method: 'GET',
		  url: `https://itunes.apple.com/search?term=${this.state.artist}`
	  }).then(res => {
	    this.setState({results: res.data.results})
	  })
  }

  render() {
    const resultsArr = this.state.results.map((e, i) => {
      return (
        <Results key={i}
                 style={{width:'100%'}}
                      play={e.previewUrl}
                      song={e.trackName}
                      artist={e.artistName}
                      collection={e.collectionName}
                      albumArt={e.artworkUrl60}
                      type={e.kind}
                      singlePrice={e.trackPrice}
                      collectionPrice={e.collectionPrice}/>
      )
    })
    return (
      <div className="main-container">
        <div className="search-container">
         <Logo/>
          <input onChange={this.handleChange}
                 onKeyDown={this.handleSearch}
                 value={this.state.artist}/>
        </div>
        {resultsArr}
      </div>
    );
  }
}

export default App;