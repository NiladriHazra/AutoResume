import React, { useContext, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '@/BackendApiCalls/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ThemeColor() {
    // Define the available colors
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ];

    // Retrieve resume information from the context
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState();
    const params = useParams(); // Get the resume ID from the route parameters

    // Function to handle color selection
    const onColorSelect=(color)=>{
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor:color
        });
        const data={
            data:{
                themeColor:color
            }
        }
    
        console.log("Data being sent to API:", data); // Log the data being sent
    
        GlobalApi.UpdateResumeDetail(params?.resumeId, data)
            .then(resp => {
                console.log('API response:', resp);
                toast('Theme Color Updated');
            })
            .catch(err => {
                console.error('Error updating theme color:', err.response);
                if (err.response && err.response.data && err.response.data.error) {
                    toast(`Error: ${err.response.data.error.message}`);
                } else {
                    toast('Failed to update theme color');
                }
            });
    };
    
    
    

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-2">
                    <LayoutGrid /> Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
                <div className='grid grid-cols-5 gap-3'>
                    {colors.map((item, index) => (
                        <div
                            key={index} // Add a unique key for each item
                            onClick={() => onColorSelect(item)} // Call onColorSelect on click
                            className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border 
                                ${selectedColor === item ? 'border border-black' : ''}`} // Conditionally apply styles
                            style={{
                                background: item // Set background color
                            }}>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ThemeColor;
