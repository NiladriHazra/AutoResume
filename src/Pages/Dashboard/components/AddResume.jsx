import { Loader2, PlusSquare } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import GlobalApi from '@/BackendApiCalls/GlobalApi'
  

const AddResume = () => {

    const [opendialoge, setopenDialoge] = useState(false);
    const [resumetitle, setresumeTitle] = useState();
    const {user} = useUser();
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate();

    const onCreate= async () => {
        setLoading(true)
        const uuid=uuidv4();
        const data={
            data:{
                title:resumetitle,
                resumeId:uuid,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        }
        GlobalApi.CreateNewResume(data).then(response => {
            console.log(response)
            if(response){
                setLoading(false)
                navigation('/dashboard/resume/'+uuid+'/edit');
            }
        },(err) => {
            setLoading(false)
        })
        console.log(resumetitle, uuid)

    }

  return (
    <div>
      <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px]
      hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
      
      onClick={() => setopenDialoge(true)}
      >
        
        <PlusSquare />
      </div>
      <Dialog open={opendialoge}>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Resume</DialogTitle>
      <DialogDescription>
        <span>Add title for your new resume</span>
        <Input className='my-2 ' placeholder='Ex. Full Stack Resume'
        onChange={(e) => setresumeTitle(e.target.value)}
        />
      </DialogDescription>
      <div className='flex justify-end gap-5'>
        <Button variant='outline' className='' onClick={()=> setopenDialoge(false)}>Cancel</Button>
        <Button  disabled={!resumetitle || loading } onClick={()=> onCreate()}>
            {loading ? <Loader2 className='animate-spin' /> : 'Create'}
            
            </Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddResume
