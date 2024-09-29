import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import AddResume from './components/AddResume'
import GlobalApi from '@/BackendApiCalls/GlobalApi'
import ResumeCardItem from './components/ResumeCardItem'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const DashboardPage = () => {

  const {user} = useUser();
  const [resumesList, setResumesList] = useState([]);
  

  useEffect(()=>{
    user && GetResumeList()
  },[user])

  const GetResumeList = ()=>{
    GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress)
      .then(response =>{
        console.log(response.data)
        setResumesList(response.data.data)

      })
  }

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume for your job role</p> 
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume />
        {resumesList.length> 0 && resumesList.map((resume, index) => (
          <ResumeCardItem  resume={resume} key={index} refreshData={GetResumeList}/>
        ))}
        </div> 
      
    </div>
  )
}

export default DashboardPage
