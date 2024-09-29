import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIchatSession } from '@/BackendApiCalls/AIModal';
import { toast } from 'sonner';
const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'
function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
    const [value,setValue]=useState(defaultValue);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [loading,setLoading]=useState(false);
    const GenerateSummeryFromAI = async () => {
      // Ensure position title exists before proceeding
      if (!resumeInfo?.experience[index]?.title) {
          toast('Please Add Position Title');
          return;
      }
  
      setLoading(true);
  
      try {
          const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
          console.log('AI Prompt:', prompt); // Log the prompt for debugging
          const result = await AIchatSession.sendMessage(prompt);
          const responseText = await result.response.text();
  
          console.log('Raw AI Response:', responseText); // Log the raw response for debugging
  
          // Check if the response is HTML
          if (responseText.startsWith('<') && responseText.endsWith('>')) {
              setValue(responseText); // Handle HTML format directly
              return; // Exit early since we've handled this case
          }
  
          // Attempt to parse as JSON
          try {
              const resp = JSON.parse(responseText);
              console.log('Parsed Response:', resp); // Log the parsed JSON
  
              // Ensure the response has the expected structure
              if (resp.position_title && Array.isArray(resp.experience_bullets)) { // Adjust to handle `experience_bullets`
                  // Format experience points with numbering and strip HTML tags
                  const formattedExperience = resp.experience_bullets
                      .map((point, idx) => `${idx + 1}. ${point.replace(/<\/?[^>]+(>|$)/g, "")}`) // Remove HTML tags
                      .join('\n\n'); // Double line breaks for readability
  
                  // Set the formatted experience in the editor
                  setValue(`Position Title: ${resp.position_title}\n\nExperience:\n${formattedExperience}`);
              } else {
                  // Handle unexpected JSON format
                  throw new Error('Unexpected JSON format: Missing position_title or experience_bullets');
              }
          } catch (jsonError) {
              console.error("Error parsing JSON:", jsonError);
              console.error("Raw response was:", responseText); // Log the raw response
  
              // Fallback: Handle unexpected plain text responses (or invalid JSON)
              toast('Unexpected response format from AI (plain text or invalid JSON)');
              setValue(responseText);  // Fallback to show the raw response in the editor
          }
      } catch (error) {
          // Handle errors in generating the summary
          console.error('Error generating summary:', error);
          toast('Failed to generate summary. Please try again.');
      } finally {
          // Always clear loading state
          setLoading(false);
      }
  };
  
  
  
  
  
  
    return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size="sm" 
        onClick={GenerateSummeryFromAI}
        disabled={loading}
        className="flex gap-2 border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spin'/>:  
          <>
           <Brain className='h-4 w-4'/> Generate from AI 
           </>
        }
         </Button>
      </div>
    <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value);
        onRichTextEditorChange(e)
      }}>
         <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
         
         
        </Toolbar>
      </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor