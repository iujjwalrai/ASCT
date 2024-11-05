import React from 'react'
import Hero from '../Components/Hero'
import Founders from '../Components/Founders'
import { founders } from "../assets/founderData"
const Home = () => {
  return (
    <div>
        <Hero/>
        <div>
            <p className='w-[90vw] mx-auto font-bold pt-6'>
                <p className='text-center w-[100%] text-2xl'>Welcome to Advocates Self Care Team - Uttar Pradesh. </p>
               <p className='text-center w-[100%] mb-8 text-2xl mt-6'>ASCT: Advocates Self Care Team उत्तर प्रदेश की वेबसाइट पर आपका स्वागत है। </p>
               हमारा उद्देश्य वकीलों और उनके परिवारों को कठिन समय में सहायता प्रदान करना है। जब किसी वकील को मृत्यु या चोट जैसी समस्याओं का सामना करना पड़ता है, तो हम आर्थिक सहायता के माध्यम से उनकी मदद करते हैं। यह सहायता यूपी के उन वकीलों द्वारा दी जाती है जो हमारी वेबसाइट पर पंजीकरण कराते हैं। हमारा मुख्य लक्ष्य वकीलों और उनके परिवारों को समर्थन और सहायता प्रदान करना है, ताकि वे ऐसे संकट में अकेले न पड़ें। हम एकजुटता और सहयोग की भावना से कार्य करते हैं, जिससे सभी वकील एक-दूसरे का सहारा बन सकें।
            </p>
        </div>
        <div className='mx-auto text-center text-blue-500 text-4xl font-bold pt-8 bg-black'>
            Our Founders
        </div>
        <div className='flex justify-evenly pt-10 bg-black'>
          {
            founders.map((founder)=>{
              return <Founders name={founder.name} img = {founder.img} desg = {founder.desg}/>
            })
          }
        </div>
        
    </div>
  )
}

export default Home