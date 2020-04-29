import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends React.Component {
    // State
    constructor(props) {
        super(props)
        this.state = {
          film: null,
          isLoading: false,
        }
    }
    
    componentDidMount() {
        const { navigation } = this.props;
        this.setState({ isLoading: true });

        getFilmDetailFromApi(navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false,
            })
        })
    }

    // Display films
    _displayFilm() {
        const { film, isLoading } = this.state

        if(isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }

        if(film != undefined) {
            return (
                <ScrollView>
                    <Image style={styles.image} source={{uri: getImageFromApi(film.backdrop_path)}}/>
                    <View style={styles.overview_container}>
                        <Text style={styles.overview_title}>{film.title}</Text>
                        <Text style={styles.overview_description}>{film.overview}</Text>
                    </View>
                    <View style={styles.informations_container}>
                        <Text>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                        <Text>Note : {film.vote_average}</Text>
                        <Text>Nombre de votes : {film.vote_count}</Text>
                        <Text>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                        <Text>Genre(s) : {(film && film.genres) && film.genres.map((item) => {
                            return item.name;
                        }).join(" / ")}</Text>
                        <Text>Companie(s) : {(film && film.genres) && film.production_companies.map((item) => {
                            return item.name;
                        }).join(" / ")}</Text>
                    </View>
                </ScrollView>
            )
        }
    }

    // Render
    render() {
        return (
            <View style={styles.main_container}>
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
        fontStyle: 'italic',
        color: '#666666',
    },
    informations_container: {
        margin: 15,
    },
    informations_text: {
        fontStyle: 'italic',
    }

})

export default FilmDetail