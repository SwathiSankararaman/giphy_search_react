import React from 'react';
import ReactDOM from 'react-dom';
import RenderGif from "./RenderGif";
import './index.css';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');

function fetchGifs(type, number) {
  const API_KEY = 'QZtIunLfjDT7BNmzwmloechaeqhbkU5L'
  const URL = encodeURI(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${type}&limit=${(number === 0) ? 25 : number}&offset=0&rating=G&lang=en`)
  if (type !== '') {
    return fetch(URL).then(response => {
      if (response.status === 200) {
       return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
  }
}

function Header() {
  return (
      <h1>Giphy Searcher</h1>
  )
}


class App extends React.Component {
  state = {
    gifType: '',
    noOfGifs: 0,
    gifList: []
}

  handleChange = (event) => {
    this.setState ({
      [event.target.name] : event.target.value
    })
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.gifType)
    fetchGifs(this.state.gifType, this.state.noOfGifs)
      .then(data => {
        const previewGifArray = data.data.map(item => item.images.preview_gif.url)
      this.setState({
        gifList: previewGifArray
      })
    }) 
    }

  render() {
    return (
      <div className='container'>
        <div className="Formcontainer">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <input id='gifType' placeholder='Search for gif' name='gifType' onChange={this.handleChange}></input>
          <input id='gifCount' placeholder='Number of gifs' name='noOfGifs' onChange={this.handleChange}></input>
          <button id='my-button'>Search for GIF</button>
        </form>
        </div>
          {<RenderGif gifList={this.state.gifList} />}
      </div>
    )
  }
}




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
