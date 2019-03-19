import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.state.loadedPost.id)
        .then(response => {
            console.log(response);
        });
    }

    componentDidUpdate(){
        if(this.props.id){
            if(!this.state.loadedPost || this.state.loadedPost.id !== this.props.id){
            axios.get('/posts/' + this.props.id)
                .then(response => {
                    console.log(response);
                    this.setState({
                        loadedPost: response.data
                    });
                });
            }
        }
    }

    render (props) {
        let post = <p>Please select a Post!</p>;
        if(this.props.id){
            post = <p>Loading...</p>;
        }
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }

        return post;
    }
}

export default FullPost;