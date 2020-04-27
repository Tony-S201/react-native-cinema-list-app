// Imports
import React from 'react'
import { FlatList, StyleSheet, View, Button, TextInput, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApi } from '../API/TMDBApi'

// Component Search
class Search extends React.Component {
    // Mise en place du state
    constructor(props) {
        super(props)
        this.state = { 
            films: [],
            isLoading: false,
         }
        this.searchedText = ""
        this.page = 0 // Page courante
        this.totalPages = 0 // Nombre de pages totale pour savoir si on a atteint la fin des retours de l'API
    }
    // Fonction qui va chercher les films de l'api et les placer dans le state (uniquement si le texte n'est pas vide)
    _loadFilms() {
        this.setState({ isLoading: true}) // Active le loading
        if (this.searchedText.length > 0) {
            getFilmsFromApi(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({ 
                    films: [ ...this.state.films, ...data.results ], // On verse les films déjà récupérés du state et on verse les suivants pour les cumuler
                    isLoading: false // Met fin au loading
                 })})
        }
    }

    // Fonction qui remet le state à zéro pour chaque nouvelle recherche
    _newSearch() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: [],
        }, () => {
            this._loadFilms()
        })
      }

    // Fonction qui va fournir la recherche
    _searchTextInputChange(text) {
        this.searchedText = text
    }

    // Gestion du chargement
    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayDetailForFilm = (id) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: id })
    }

    // Template
    // onSubmitEditing permet de lancer la recherche via la touche "entrer" du téléphone
    render() {
        console.log('Hello World')
        return (
            <View style={ styles.main_container }>
                <TextInput onSubmitEditing={() => this._newSearch()} onChangeText={(text) => this._searchTextInputChange(text)} style={ styles.textInput } placeholder="Titre du film"></TextInput>
                <Button style={{ height: 50 }} title="Rechercher" onPress={() => this._newSearch()}></Button>
                <FlatList
                    data={ this.state.films }
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            this._loadFilms() // Si la page actuelle est inférieure au nombre de page totale, on relance le chargement des films (qui fera page+1)
                        }
                    }}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

// Styles
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Search