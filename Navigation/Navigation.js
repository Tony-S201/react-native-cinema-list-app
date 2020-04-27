import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'

const SearchStackNavigator = createStackNavigator({
    Search: { // On appelle la vue "Search" mais on peut utiliser n'importe quel nom, on l'utilisera pour appeler la vue en question
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: 'Détail du film'
        }
    }
})

export default createAppContainer(SearchStackNavigator)