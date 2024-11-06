import React from 'react'
import Footer from '../Components/Footer'
import Hero from '../Components/Hero'
import Card from '../Components/Card'
import { abouts } from '../assets/aboutUs'

const About = () => {
  return (
    <div>
      <Hero />
      <div>
        <h1 className='bg-black text-white text-3xl font-bold text-center py-5'>एडवोकेट सेल्फ केयर टीम - उत्तर प्रदेश</h1>
        <h1 className='bg-black text-white text-center text-xl'>आइये जानते हैं अधिवक्ता सेल्फ केयर टीम के बारे में क्या है ASCT</h1>
        <p className='bg-black text-white text-center pt-3 text-md pb-6'>ASCT अधिवक्ताओं का, अधिवक्ताओं के लिए, अधिवक्ताओं के द्वारा समूह से जुड़े अधिवक्ताओं के असामयिक मृत्यु होने पर उनके परिवार को आर्थिक सहायता देने हेतु बनाया गया है।</p>
      </div>
      <div className='flex justify-center py-16 bg-[#D5C5C8]'>
        <div className='grid grid-cols-2 gap-y-14 gap-x-14'>
          {
            abouts.map((about) => {
              return (
                <Card key={about.head} head={about.head} desc={about.desc} />
              )
            })
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
