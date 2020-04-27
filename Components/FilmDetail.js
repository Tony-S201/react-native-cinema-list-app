import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native'
import { getFilmDetailFromApi } from '../API/TMDBApi'
import { ScrollView } from 'react-native-gesture-handler'

class FilmDetail extends React.Component {
    // State
    constructor(props) {
        super(props)
        this.state = {
          film: '', // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
          isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
    }
    
    componentDidMount() {
        console.log(this.props.navigation.state.params.idFilm)
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false,
            })
        })
    }

    // Loading
    _displayLoading = () => {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    // Display films
    _displayFilm() {
        if(this.state != '') {
            console.log(this.state)
            return (
                <ScrollView>
                    <Text>{this.state.film.title}</Text>
                </ScrollView>
            )
        }
    }

    // Render
    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 169,
        margin: 5,
    },
    overview_container: {
        marginTop: 10,
    },
    overview_title: {
        alignSelf: 'center',
        fontSize: 19,
        fontWeight: 'bold',
    },
    overview_description: {
        margin: 15,
    },
    informations_container: {
        margin: 15,
    }

})

export default FilmDetail