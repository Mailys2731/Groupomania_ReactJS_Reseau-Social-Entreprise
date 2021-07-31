import axios from 'axios';
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert2';
import Header from '../components/header';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        width: '100%',
    },
    buttonProfile: {
        margin: '1rem'
    },
    buttonContainer: {
        margin: '2rem',
        display: 'flex',
        justifyContent: 'center'
    },
    titleProfile: {
        textAlign: 'center',
        marginTop: '4rem'
    },
    linkHomeContainer: {
        display:'flex',
        justifyContent:'center'
    },
    linkHome: {
        textDecoration: 'none',
        color:'#d1515A'
    }


})

class ProfileUser extends Component {

    deconnexionBdd() {

        const id = localStorage.userId
        axios.put(`http://localhost:3000/api/users/${id}`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
            .then(res => {
                console.log("L'utilisateur à était déconnecté avec succès")
                new swal("Déconnexion réussie", "À bientôt !", "success");

            })

            .catch(error => {
                console.log('Erreur déconnexion:', error)
                new swal("Il semble que nous rencontrons un problème pour vous déconnecter", "Nous mettons tout en oeuvre pour résoudre le problème...", "warning");

            })
            .then(
                this.props.history.push('/'),
                localStorage.clear()

            )
    }

    deleteUser() {
        const id = localStorage.userId
        axios.delete(`http://localhost:3000/api/users/${id}`, { headers: { Authorization: `Bearer ${localStorage.token}` } })

            .then(res => {
                console.log("Le compte de l'utilisateur à était supprimé avec succès")
                new swal("Votre compte a bien été définitivement supprimé", "Nous espérons vous revoir un jour...", "success");

            })
            .then(
                this.props.history.push('/')

            )

            .catch(error => {
                console.log('Erreur suppression du compte:', error)
                new swal("Il semble que nous rencontrons un problème pour supprimer votre compte", "Nous mettons tout en oeuvre pour résoudre le problème...", "warning");


            })

    }

    render() {
        const { classes } = this.props;
        const userName = localStorage.userName
        const userEmail = localStorage.userEmail

        return (

            <Container className={classes.root}>
                <Header history={this.props.history} />
                <div className={classes.titleProfile}>
                    <h1>Gestion de votre compte</h1>
                    <p>Pseudo : {userName}</p>
                    <p>Adresse Email : {userEmail}</p>

                </div>
                <div className={classes.buttonContainer}>

                    <Button
                        className={classes.buttonProfile}
                        variant="contained"
                        size="large"
                        onClick={() => {
                            this.deconnexionBdd()
                            localStorage.clear()

                        }}
                    >
                        Déconnexion
                    </Button>
                    <Button
                        className={classes.buttonProfile}
                        variant="contained"
                        size="large"
                        onClick={() => {
                            this.deleteUser()
                            localStorage.clear()

                        }}
                    >
                        Supprimer mon compte

                    </Button>
                </div>
                <div className={classes.linkHomeContainer}>
                    <a className={classes.linkHome} href="/home">Retour à la page d'accueil</a>
                </div>
            </Container>
        )

    }
}

export default withStyles(styles, { withTheme: "true" })(ProfileUser)
