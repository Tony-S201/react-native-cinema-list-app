import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import { ScrollView } from 'react-native-gesture-handler'
import numeral from 'numeral'
import moment from 'moment'

class FilmDetail extends React.Component {
    render() {
        const film = this.props.navigation.state.params.filmDatas
        console.log(film)
        return (
            <ScrollView style={styles.main_container}>
                <Image 
                    style={ styles.image }
                    source={{uri: getImageFromApi(film.poster_path)}}
                    >
                </Image>
                <View style={ styles.overview_container }>
                    <Text style={ styles.overview_title }>{ film.title }</Text>
                    <Text style={ styles.overview_description }>{ film.overview }</Text>
                </View>
                <View style={ styles.informations_container }>
                    <Text>Sorti le { film.release_date }</Text>
                    <Text>Note : { film.vote_average }</Text>
                    <Text>Nombre de votes : { film.vote_count }</Text>
                    <Text>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text>Genre(s) : { film.genres }</Text>
                    <Text>Companie(s) :</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        height: 190,
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