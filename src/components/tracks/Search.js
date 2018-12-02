import React, {Component} from 'react'
import axios from 'axios';
import {Consumer} from '../../context';
export class Search extends Component {
  state = {
    trackTitle:''
  }
  onChange = e=>{
    this.setState({trackTitle: e.target.value});
  }
  findTrack = (o,e)=>{
    e.preventDefault();
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&apikey=${
      process.env.REACT_APP_MM_KEY}`)
    .then(res=>{
      o({
        type: 'SEARCH_TRACKS',
        payload: res.data.message.body.track_list
      });
    })
    .catch(err => console.log(err));
  }
  render(){
    return (
      <Consumer>
        {value=>{
          const {o} = value;
          return(
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search For Song
              </h1>
              <p className="load text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this,o)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title.."
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                  <button
                    className="btn btn-primary btn-lg btn-block mb-5"
                    type="submit"
                  >
                  Get tracks
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </Consumer>
    )
  }
}
