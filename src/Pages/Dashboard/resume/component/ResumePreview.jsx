import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react'
import PersonalDetailsPreview from './preview/PersonalDetailsPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';

const ResumePreview = () => {

  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{borderColor:resumeInfo?.themeColor}}
    >

      {/* Personal details */}
      <PersonalDetailsPreview resumeInfo={resumeInfo} />
      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo} />
      {/* Professional  Experience */}
      <ExperiencePreview resumeInfo={resumeInfo} />
      {/* Educational Details */}
      <EducationalPreview resumeInfo={resumeInfo} />
      {/* Skills */}
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  )
}

export default ResumePreview
