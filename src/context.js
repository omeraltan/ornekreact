import React, { Component } from 'react';

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
        users: [
          {
            id : "unique-1",
            name : "Ömer ALTAN",
            salary : "5000",
            department : "Bilişim"
          },
          {
            id : "unique-2",
            name : "Adil ALTAN",
            salary : "2000",
            department : "Pazarlama"
          },
          {
            id : "unique-3",
            name : "Elif ALTAN",
            salary : "1000",
            department : "Üretim"
          }
        ],
        //Buradaki dispatch vasıtasıyla reducer'a, sayfalardan gelen actionlar (sayfalardaki dispatc ile) gönderilir.
        dispatch : action => {
            this.setState(state => reducer(state, action))
        }
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