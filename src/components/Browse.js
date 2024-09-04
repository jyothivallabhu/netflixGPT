import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../hooks/usePopularMovies'
import { useSelector } from 'react-redux'
import GptSearch from './GptSearch'


const Browse = () => {

   const showGptSearch = useSelector((store)=>store.gptSearch.showGptSearch)
  
  useNowPlayingMovies()
  usePopularMovies()
  
  
  return (
    <div>
      <Header />
      {
        showGptSearch ?
          (<GptSearch />) :
          (
            <>
              <MainContainer />
              <SecondaryContainer />
            </>
          )
      }
      
      Browse
    </div>
  )
}

export default Browse