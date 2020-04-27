import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { green } from 'color-name'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {
    render() {
        const { film, displayDetailForFilm } = this.props
        return (
            // View globale
            <TouchableOpacity 
                style={ styles.global } 
                onPress={() => displayDetailForFilm(film)}>
                <Image 
                    style={ styles.image }
                    source={{uri: getImageFromApi(film.poster_path)}}
                    >
                </Image>
                <View style={ styles.content }>
                    <View style={ styles.header }>
                        <Text style={ styles.titre }>{film.title}</Text>
                        <Text style={ styles.vote }>{film.vote_average}</Text>
                    </View>
                    <View style={ styles.description }>
                        <Text style={ styles.description_text } numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={ styles.date }>
                        <Text style={ styles.date_text }>Sorti le {film.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    global: {
        height: 190,
        backgroundColor: '#BFBFBF',
        flexDirection: 'row',
    },
    image: {
        backgroundColor: '#000000',
        width: 100,
        margin: 10,
    },
    content: {
        flexDirection: 'column',
        flex: 1,
        margin: 10,
    },
    header: {
        flex: 2,
        flexDirection: 'row',
        margin: 5,
        height: 25,
        justifyContent: 'space-between',
    },
    titre: {
        fontWeight: 'bold',
        fontSize: 14,
        flexWrap: 'wrap',
        width: 150,
    },
    vote: {
        fontSize: 18,
        color: '#787878'
    },
    description: {
        flex: 5.5,
        margin: 5,
        height: 120,
        alignItems: 'flex-start',
    },
    description_text: {
        fontStyle: 'italic',
        fontSize: 13,
    },
    date: {
        flex: 1,
        margin: 5,
        alignItems: 'flex-end',
    },
    date_text: {

    },  
})

export default FilmItem