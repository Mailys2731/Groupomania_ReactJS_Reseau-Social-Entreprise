import React, {Component} from 'react'




class ProfileUser extends Component {

    render(){


        return(
            <div>
                <button
                
                onClick={ () => {
                    localStorage.clear()
                    this.props.history.push('/');
                  
                }}
                >
                    Déconnexion
                </button>
            </div>
        )

    }
}

export default ProfileUser
