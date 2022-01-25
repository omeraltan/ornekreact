import React, { Component } from 'react';
import axios from 'axios';

const UserContext = React.createContext();
//reducer dispatch'den gelen argümanlara göre işlem yapıp state'i döndürür.
const reducer = (state, action) => {
  switch(action.type){
    case "DELETE_USER":
      return {
        ...state,
        users : state.users.filter(user => action.payload !== user.id)
      }
      case "ADD_USER":
        return {
          ...state,
          users : [...state.users, action.payload]
        }
     default:
       return state 
  }
}

//Provider, Consumer
export class UserProvider extends Component {
    state = {
        users: [],
        //Buradaki dispatch vasıtasıyla reducer'a, sayfalardan gelen actionlar (sayfalardaki dispatc ile) gönderilir.
        dispatch : action => {
            this.setState(state => reducer(state, action))
        }
      }
      componentDidMount = async () => {
        const response = await axios.get("http://localhost:3004/users");
        this.setState({
          users : response.data
        })
      }
      
      render() {
        return(
            <UserContext.Provider value = {this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}
const UserConsumer = UserContext.Consumer;
export default UserConsumer;