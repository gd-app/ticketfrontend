import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Movie from './components/movie';


class App extends Component {

  state = {
    movies: [],
    showModal: false
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/movie/v1/list')
    .then(res => res.json())
    .then((data) => {
      this.setState({ movies: data })
    })
    .catch(console.log)
  }

  render (){
    return (
    <div className="card">
            <div className="card-body">

              
                <Movie movies={this.state.movies} />
              
              
            </div>

          </div>
          )
  }
}

export default App;
