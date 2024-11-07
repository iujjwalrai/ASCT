import React from 'react'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'
const Niyamawali = () => {
  return (
    <div>
      <Hero/>
      <div className='bg-[#D5C5C8]'>
        <h1 className='text-3xl text-center py-8'>एडवोकेट सेल्फ केयर टीम नियमावली</h1>
        <h1 className='text-3xl text-center py-8 text-red-600'>सेवा परमो धर्म:</h1>
        <p className='text-center text-xl py-8'>Click <a href='https://www.dropbox.com/scl/fi/5gci35bo383dvdgph703j/Rules.pdf?rlkey=ck8irlnkx8q9ci0biilntlchu&st=n5b7a3u2&dl=1' target="_blank" rel="noopener noreferrer" className='text-red-500'>here</a> to Download the Niyamawali Of Advoacates Self Care Team - Uttar Pradesh</p>
        <p className='text-center text-xl py-8'> Or You can see the Inline view of the Niyamwali of ASCT-UP below</p>
        <div className='flex justify-center'><iframe src= "https://drive.google.com/file/d/19qstbrYIVOqC6gf3K6usrEURymVoDVKV/preview" height="650" width = "70%" className='rounded-xl mb-8'></iframe></div>
      </div>
      <Footer/>
    </div>
  )
}

export default Niyamawali