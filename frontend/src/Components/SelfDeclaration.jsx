import React from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
const SelfDeclaration = () => {
  const advo = useSelector((state)=>state.user.userDetails);
  const {register, handleSubmit, formState: { errors }} = useForm();

  const submitHandler = async(data)=>{
    try{
        data.userId = advo._id;
        const responseFromServer = await toast.promise(axios.put(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/selfDeclaration`, data, {
            headers:{
                "Content-Type": "application/json"
            },
            withCredentials: true
        }), {
            loading: "Declaring the self declaration",
            success: <b>Declared the self declaration</b>,
            error: <b>An error occured while declaring the self declaration</b>
        });

    }
    catch(er){
        console.log(er);
        toast.error("Some error occured");
    }
  }
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-6 relative min-h-screen">
        <Sidebar/>
        <div className="mt-16 w-full md:w-[70vw] max-w-[90vw] bg-blue-100 shadow-2xl shadow-black rounded-3xl md:px-16 px-3 py-8 mx-auto">
            <h1 className='text-red-600 text-2xl font-bold text-center'>Please read the below Self Declaration Form Carefully</h1>
            <h1 className='text-blue-600 text-xl font-bold text-center underline mt-8'>* Kindly check the checkbox only if you have read and you agree with the below Self Declaration</h1>
            <p className='mt-4 text-lg'>I <b className='underline text-red-500'>{advo.name}</b> bearing COP No. <b className='underline text-red-500'>{advo.COPNo}</b> and Registration No. <b className='underline text-red-500'>{advo.RegNo}</b> hereby declare that I normally do my legal practice at <b className='underline text-red-500'>{advo.Jila}</b> in the <b className='underline text-red-500'>{advo.AdPractice}</b> I belong to the <b className='underline text-red-500'>{advo.HomeDistrict}</b> District of Uttar Pradesh and my Home Address is <b className='underline text-red-500'>{advo.HomeAddress}</b> I have read and fully understood all the rules, terms and conditions, operations, protocols, and methodologies associated with ASCT (Advocates Self Care Team - Uttar Pradesh). I acknowledge and agree to abide by all the stated guidelines, policies, and procedures, and I accept the responsibilities outlined therein I will keep myself updated with the rules,terms, conditions, operations, protocols, and methodologies of ASCT (Advocates Self Care Team - Uttar Pradesh) as they are updated from time to time, and I agree to abide by all such rules. I further confirm that neither I nor my family will exert any pressure on ASCT for any benefits contrary to these rules.I also consent that any benefits will be provided to me or my family only in accordance with the applicable rules. I understand that neither I nor my family will be entitled to file any judicial or legal claim in this regard. I am committed to following all the rules and terms applicable to me.</p>
            <form className='mt-4' onSubmit={handleSubmit(submitHandler)}>
            <div className='text-lg text-green-700 underline font-bold'>
                <label htmlFor='agree'>
                    <input type="checkbox" id='agree' {...register("agree", { required: "You must agree to proceed" })}></input>  I agree to the terms and conditions and the above Self Declaration
                </label>
                {errors.agree && <p className='text-red-600'> ***{errors.agree.message}</p>}
            </div>
            <button type="submit" className='bg-green-500 px-20 py-2 rounded-lg font-bold text-lg mt-4 hover:border-black hover:border-2 hover:rounded-3xl duration-300'>Submit</button>
        </form>
        </div>
        
    </div>
  )
}

export default SelfDeclaration