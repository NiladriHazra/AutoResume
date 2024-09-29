import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/Pages/Dashboard/resume/component/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '@/BackendApiCalls/GlobalApi'
import { RWebShare } from 'react-web-share'

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, [])

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload = () => {
        window.print();
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }} >
            {/* Inline CSS for printing */}
            <style>
                {`
                @media print {
                    #no-print {
                        display: none;
                    }
                    #print-area {
                        display: block !important;
                    }
                }
                `}
            </style>

            {/* Section that should not be printed */}
            <div id="no-print">
                <Header />

                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Resume is ready!
                    </h2>
                    <p className='text-center text-slate-500'>
                        Now you are ready to download your resume and you can share a unique resume URL with your friends and family.
                    </p>
                    <div className='flex justify-between px-44 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>

                        <RWebShare
                            data={{
                                text: "Hello Everyone, This is my resume, please open the URL to see it.",
                                url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>
                    </div>
                </div>
            </div>

            {/* Only this section will be printed */}
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <div id="print-area">
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume;
