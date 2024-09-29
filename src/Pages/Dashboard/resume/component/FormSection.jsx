import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Summery from './forms/Summery'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'

const FormSection = () => {

  const[activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setenableNext] = useState(false);
  const{resumeId} = useParams()

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
        <Link to={"/dashboard"}><Button><Home /></Button></Link>
        <ThemeColor />
        
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1 && <Button size="sm"
           onClick={()=>setActiveFormIndex(activeFormIndex-1)}
          ><ArrowLeft /></Button>}
          <Button 
          disabled={!enableNext}
          className="flex gap-2" size="sm"
          onClick={()=>setActiveFormIndex(activeFormIndex+1)}
          >Next    <ArrowRight /> </Button>

        </div>
      </div>
      {/* Personal detail */}
      {activeFormIndex === 1 ? <PersonalDetails enableNext={(v) => setenableNext(v)}/> : null}
      {/* Summery */}
      {activeFormIndex === 2 ? <Summery enableNext={(v) => setenableNext(v)}/> : null}
      {/* Experience */}
      {activeFormIndex === 3 ? <Experience enableNext={(v) => setenableNext(v)}/> : null}
      {/* Educational details */}
      {activeFormIndex === 4 ? <Education enableNext={(v) => setenableNext(v)}/> : null}
      {/* Skills  */}
      {activeFormIndex === 5 ? <Skills enableNext={(v) => setenableNext(v)}/> : null}
      {/* view */}
      {activeFormIndex === 6 ? <Navigate to={'/my-resume/'+resumeId+'/view'} />: null}

    </div>
  )
}

export default FormSection
