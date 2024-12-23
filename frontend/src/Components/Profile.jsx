import React from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {upDistrictsAndTehsils} from "../assets/upDistrictsAndTeshils"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { setUser } from '../redux/slices/userSlice'
import { IoMdCloseCircle } from "react-icons/io";
const Profile = () => {
    const user = useSelector((state)=> state.user.userDetails);
    const dispatch = useDispatch();

    const districts = Object.keys(upDistrictsAndTehsils);

    const [selectedDistrict, setSelectedDistrict] = useState(user.Jila || "");
    const[tehsils, setTehsils]= useState([]);

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const openPopUp = ()=>{
        document.body.style.overflow = 'hidden';
        setIsPopUpOpen(true);
    }
    const closePopUp = ()=>{
        setIsPopUpOpen(false);
        document.body.style.overflow = 'auto';
    }

    const handleDistrictChange = (event)=>{
        const dist = event.target.value;
        setSelectedDistrict(dist);

        setTehsils(dist ? upDistrictsAndTehsils[dist] : [])
    }


    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            email: user.email || '',
            Gender: user.Gender || '',
            BloodGroup: user.BloodGroup || '',
            AdPractice: user.AdPractice || '',
            Jila: user.Jila || '',
            Tehsil: user.Tehsil || '',
            HomeDistrict: user.HomeDistrict || '',
            HomeAddress: user.HomeAddress || '',
            firstNomineeName : user.firstNomineeName || '',
            firstNomineeMobile: user.firstNomineeMobile || '',
            firstNomineeRelation: user.firstNomineeRelation || '',
            secondNomineeName: user.secondNomineeName || '',
            secondNomineeMobile: user.secondNomineeMobile || '',
            secondNomineeRelation: user.secondNomineeRelation || ''
        }
    });


    const submitHandler = async(data)=>{
        const formData = {...data, Jila:selectedDistrict};

        console.log(formData);
        try{
            const resServer = await toast.promise(axios.put(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/update-profile`, JSON.stringify(formData), {headers: { "Content-Type": "application/json" },withCredentials: true}), {
                loading: "Updating the Profile on ASCT - UP",
                success: <b>Updated the profile successfully</b>,
                error: <b>Error in updating the profile</b>
            })

            console.log(resServer.data.user);
            dispatch(setUser(resServer.data.user));
            closePopUp();
        }
        catch(error){
            console.log(error);
        }
    }
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-6 relative min-h-screen md:items-start">
        <Sidebar/>
        <div className="mt-16 w-full md:w-[70vw] max-w-[95vw] bg-blue-100 shadow-2xl shadow-black rounded-3xl px-16 py-8 mx-auto">
            <h1 className='text-2xl font-semibold'>Welcome {user.name}!! Your details are as follows </h1>
            <h2 className='mt-5 text-2xl text-red-600 text-center font-bold'>Basic Details</h2>
            <div className='mt-8 flex md:flex-row flex-col gap-y-1 md:justify-between text-lg text-blue-950 font-semibold'>
                <p className='border-2 border-red-700 min-w-[40%] text-center'>Name: {user.name}</p>
                <p className='border-2 border-red-700 min-w-[20%] text-center'>Reg No: {user.RegNo}</p>
                <p className='border-2 border-red-700 min-w-[30%] text-center'>Email: {user.email}</p>
            </div>
            <div className='mt-8 flex md:flex-row flex-col gap-y-1 md:justify-between text-lg text-blue-950 font-semibold'>
                <p className='border-2 border-red-700 min-w-[20%] text-center'>Gender: {user.Gender}</p>
                <p className='border-2 border-red-700 min-w-[40%] text-center'>DOB: {user.DOB}</p>
                <p className='border-2 border-red-700 min-w-[30%] text-center'>Mobile: {user.mobile}</p>
            </div>
            <div className='mt-8 flex md:flex-row flex-col gap-y-1 md:justify-between text-lg text-blue-950 font-semibold'>
                <p className='border-2 border-red-700 min-w-[15%] text-center'>COPNo: {user.COPNo}</p>
                <p className='border-2 border-red-700 min-w-[20%] text-center'>COP No Year: {user.COPNoYear}</p>
                <p className='border-2 border-red-700 min-w-[20%] text-center'>Reg No Year: {user.RegNoYear}</p>
            </div>
            <h2 className='mt-5 text-2xl text-red-600 text-center font-bold'>Practice Details</h2>
            <div className='mt-5 flex md:flex-row flex-col gap-y-1 md:justify-between text-lg text-blue-950 font-semibold'>
                <p className='border-2 border-red-700 min-w-[35%] text-center '>Practice district: {user.Jila}</p>
                <p className='border-2 border-red-700 min-w-[25%] text-center'>Teshil: {user.Tehsil}</p>
                <p className='border-2 border-red-700 min-w-[35%] text-center'>Practice Level: {user.AdPractice}</p>
            </div>
            <h2 className='mt-5 text-2xl text-red-600 text-center font-bold'>Other Details</h2>
            <div className='mt-5 flex md:flex-row flex-col gap-y-1 md:justify-between text-lg text-blue-950 font-semibold'>
                <p className='border-2 border-red-700 min-w-[20%] text-center'>Blood Group: {user.BloodGroup}</p>
                <p className='border-2 border-red-700 min-w-[35%] text-center'>Home District: {user.HomeDistrict}</p>
            </div>
            <div className='mt-5 flex justify-between text-lg text-blue-950 font-semibold'><p className='border-2 border-red-700 min-w-[100%] text-center'>Home Address: {user.HomeAddress}</p></div>
            <h2 className='mt-5 text-2xl text-red-600 text-center font-bold'>Nominee Details</h2>
            <div className='mt-5 flex md:flex-row flex-col gap-y-1 md:justify-between text-lg text-blue-950 font-semibold'>
                <p>First Nominee Name: {user.firstNomineeName}</p>
                <p>First Nominee Relation: {user.firstNomineeRelation}</p>
                <p>First Nominee Mobile: {user.firstNomineeMobile}</p>
            </div>
            <div className='mt-2 flex md:flex-row flex-col gap-y-1 md:justify-between text-lg text-blue-950 font-semibold'>
                <p>Second Nominee Name: {user.secondNomineeName}</p>
                <p>Second Nominee Relation: {user.secondNomineeRelation}</p>
                <p>Second Nominee Mobile: {user.secondNomineeMobile}</p>
            </div>
            <div className='text-red-600 text-center text-2xl font-semibold mt-5'>Want to Edit Your Details ?? Click below to do</div>
            <button className='py-2 w-full mt-10 bg-yellow-600 rounded-lg text-lg text-white hover:bg-yellow-400 hover:text-black duration-200 transition-all' onClick={openPopUp}>Edit Details</button>
        </div>
        {
            isPopUpOpen &&(
                <div className='overlay fixed top-0 right-0 bottom-0 left-0 backdrop-blur-lg flex justify-center items-center z-10' onClick={closePopUp}>
                    <div className='content w-[85%] max-w-[90%] h-[95vh] py-12 px-12 rounded-3xl bg-white shadow-2xl shadow-black z-20 relative overflow-y-auto' onClick={(e) => e.stopPropagation()}>
                        <IoMdCloseCircle className='absolute top-0 right-1 text-5xl cursor-pointer  text-red-600' onClick={closePopUp}/>
                        <h1 className='text-center text-red-600 text-xl font-semibold'>Edit your Profile Details</h1>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className='flex md:flex-row flex-col gap-y-3 md:justify-between mt-3'>
                                <div>
                                    <label htmlFor='name' className='block text-red-600 font-bold'>Name *</label>
                                    <input type='text' value={user.name} disabled id='name' className='bg-gray-400 px-4 py-2 rounded-xl mt-2'></input>
                                </div>
                                <div>
                                    <label htmlFor='cop' className='block text-red-600 font-bold'>COP No. *</label>
                                    <input type='text' value={user.COPNo} disabled id='cop' className='bg-gray-400 px-4 py-2 rounded-xl mt-2'></input>
                                </div>
                                <div>
                                    <label htmlFor='reg' className='block text-red-600 font-bold'>Reg No. *</label>
                                    <input type='text' value={user.RegNo} disabled id='reg' className='bg-gray-400 px-4 py-2 rounded-xl mt-2'></input>
                                </div>
                                <div>
                                    <label htmlFor='mob' className='block text-red-600 font-bold'>Mobile No. *</label>
                                    <input type='text' value={user.mobile} disabled id='mob' className='bg-gray-400 px-4 py-2 rounded-xl mt-2'></input>
                                </div>
                            </div>
                            <div className='flex md:flex-row flex-col gap-y-3 md:justify-between mt-3'>
                                <div>
                                    <label htmlFor='email' className='block text-red-600 font-bold'>Email *</label>
                                    <input type='text' id='email' className='bg-gray-200 px-4 py-2 rounded-xl mt-2' {...register("email")}></input>
                                </div>
                                <div>
                                    <label htmlFor='gender' className='block text-red-600 font-bold'>Gender*</label>
                                    <select className='bg-gray-200 px-4 py-2 rounded-xl mt-2' id="gender" {...register("Gender")}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='blood' className='block text-red-600 font-bold'>Blood Group</label>
                                    <select className='bg-gray-200 px-4 py-2 rounded-xl mt-2' id="blood" {...register("BloodGroup")}>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='prac' className='block text-red-600 font-bold'>Ad Practice Level*</label>
                                    <select className='bg-gray-200 px-4 py-2 rounded-xl mt-2' id="prac" {...register("AdPractice")}>
                                        <option value="Jila Nyayalay">Jila Nyayalay</option>
                                        <option value="Uchh Nyayalay">Uchh Nyayalay</option>
                                        <option value="Tehsil Nyayalay">Tehsil Nyayalay</option>
                                    </select>
                            
                                </div>
                            </div>
                            <div className='flex md:flex-row flex-col gap-y-3 md:justify-between mt-3'>
                                <div>
                                    <label htmlFor='dis' className='block text-red-600 font-bold'>District *</label>
                                    <select className='bg-gray-200 px-4 py-2 rounded-xl mt-2' id="dis" value={selectedDistrict} onChange={handleDistrictChange}>
                                            {
                                                districts.map((district)=>{
                                                    return (<option value={district}>{district}</option>)
                                                })
                                            }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='teh' className='block text-red-600 font-bold'>Tehsil *</label>
                                    <select className='bg-gray-200 px-4 py-2 rounded-xl mt-2' id='teh' {...register("Tehsil")}>
                                        {
                                            tehsils.map((tehsil)=>{
                                                return (<option value={tehsil}>{tehsil}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='hd' className='block text-red-600 font-bold'>Home District *</label>
                                    <select className='bg-gray-200 px-4 py-2 rounded-xl mt-2' id="hd" {...register("HomeDistrict")}>
                                            {
                                                districts.map((district)=>{
                                                    return (<option value={district}>{district}</option>)
                                                })
                                            }
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className='mt-2'>
                                    <label htmlFor='ha' className='block text-red-600 font-bold'>Enter the Home Address *</label>
                                    <input type="text" placeholder='Enter the home address' className='w-[95%] bg-gray-200 px-4 py-2 rounded-xl mt-2' id="ha" {...register("HomeAddress")}></input>
                                </div>
                            </div>
                            <div className='flex md:flex-row flex-col gap-y-3 md:justify-between mt-3'>
                                <div>
                                    <label htmlFor='nname1' className='block text-red-600 font-bold'>Nominee 1</label>
                                    <input type='text' className='bg-gray-200 px-4 py-2 rounded-xl mt-2' disabled={user.firstNomineeName} id='nname1' {...register("firstNomineeName")}></input>
                                </div>
                                <div>
                                    <label htmlFor='nrelation1' className='block text-red-600 font-bold'>Nominee 1 Relation</label>
                                    <input type='text' className='bg-gray-200 px-4 py-2 rounded-xl mt-2' disabled={user.firstNomineeRelation} id='nrelation1' {...register("firstNomineeRelation")}></input>
                                </div>
                                <div>
                                    <label htmlFor='nmobile1' className='block text-red-600 font-bold'>Nominee 1 Mobile</label>
                                    <input type='text' className='bg-gray-200 px-4 py-2 rounded-xl mt-2' disabled={user.firstNomineeMobile} id='nmobile1' {...register("firstNomineeMobile")}></input>
                                </div>
                            </div>
                            <div className='flex md:flex-row flex-col gap-y-3 md:justify-between mt-3'>
                                <div>
                                    <label htmlFor='nname2' className='block text-red-600 font-bold'>Nominee 2</label>
                                    <input type='text' className='bg-gray-200 px-4 py-2 rounded-xl mt-2' disabled={user.secondNomineeName} id='nname2' {...register("secondNomineeName")}></input>
                                </div>
                                <div>
                                    <label htmlFor='nrelation2' className='block text-red-600 font-bold'>Nominee 2 Relation</label>
                                    <input type='text' className='bg-gray-200 px-4 py-2 rounded-xl mt-2' disabled={user.secondNomineeRelation} id='nrelation2' {...register("secondNomineeRelation")}></input>
                                </div>
                                <div>
                                    <label htmlFor='nmobile2' className='block text-red-600 font-bold'>Nominee 2 Mobile</label>
                                    <input type='text' className='bg-gray-200 px-4 py-2 rounded-xl mt-2' disabled={user.secondNomineeMobile} id='nmobile2' {...register("secondNomineeMobile")}></input>
                                </div>
                            </div>
                            <div>
                                <div className='mt-2'>
                                    <label htmlFor='disease' className='block text-red-600 font-bold'>Enter the Disease and description (if any)</label>
                                    <input type="text" placeholder='Enter disease (if any)' className='w-[95%] bg-gray-200 px-4 py-2 rounded-xl mt-2' id="disease" {...register("disease")}></input>
                                </div>
                            </div>
                            <button className='bg-blue-900 text-white py-4 px-4 rounded-3xl w-full mt-10 hover:bg-blue-500 duration-200 text-lg font-bold' type='submit'>Update Details</button>
                        </form>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Profile