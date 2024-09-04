import React from 'react'
import { useSelector } from 'react-redux'
import lang from '../utils/language';

const GptSearchBar = () => {

const langkey = useSelector((store)=>store.config.lang)


  return (
      <div className='p-[20%] flex justify-center'>
          <form className='w-1/2 m-6 bg-black grid grid-cols-12'>
              <input className='p-2 m-2 col-span-9' type='text' placeholder={lang[langkey].gptSearchPlaceholder} />
              <button className='p-2 m-2 bg-red-500 rounded text-white col-span-3'>{lang[langkey].search}</button>
          </form>
      </div>
  )
}

export default GptSearchBar