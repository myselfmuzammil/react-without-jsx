import { Component } from 'react'
import {USER_URI} from '../constants'

/**
 * React
 * Class component
 * Life cycle methods
 * 
 * there is five important
 * life cycle methods in class component.
 * 
 * 1) constructor
 * 2) render
 * 3) componentDidMount
 * 4) componentDidUpdate
 * 5) componentWillUnmount
 * 
 * Constructor:
 * 
 * this is the best place to create variables
 * because constructor calls only once and before render method.
 * 
 * Render:
 * 
 * this is the method where we write our jsx code 
 * and render method calls after the constructor method.
 * 
 * ComponentDidMount:
 * 
 * here we mostly call api and componentDidMount always
 * calls once after the render method.
 * 
 * ComponentDidUpdate:
 * 
 * componentDidUpdate calls after every render when state got change.
 * 
 * ComponentWillUnmount:
 * 
 * here we do clean up like removing the event listeners and setIntervals
 * componentWillUnmount only call when the component is unmount.
 * 
 * 
 * there is two phrases first is render phrase when the constructor and render call
 *  this render phrase updates the DOM
 * and the second phrase is commit phrase when all child and parent component's 
 * componentDidMount and componentDidUpdate call in a hierarchy.
 * 
 */

export class Profile extends Component {
    constructor(props){
        super(props);
        console.log('constructor')
        this.state = {
            userInfo: null,
            error: null
        }
    }

    render(){
        console.log('render')
        const { userInfo } = this.state;

        return userInfo ? (
            <div className='profile_cart'>
                <img className='profile_img' src={userInfo?.avatar_url}/>
                <span>Username: {userInfo?.login}</span>
                <span>Name: {userInfo?.name}</span>
                <span>Followers: {userInfo?.followers}</span>
                <span>Following: {userInfo?.following}</span>
            </div>
        ) : (
            <h1>loading............</h1>
        )
    }

    componentDidUpdate(){
        console.log('componentDidUpdate')
    }

    componentDidMount(){
        fetch(USER_URI)
        .then(userInfo => userInfo.json())
        .then(userInfo => this.setState({ userInfo }))
        .catch(error => this.setState({ error }));

        console.log('componentDidMount')
    }
}

export default Profile;
