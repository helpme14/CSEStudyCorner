import { useState } from "react";
import Navbar from "../Navbar";
import sections  from "../modules/sections";
import {
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { GoDot } from "react-icons/go";
import Speed from "@/components/ui/speed-dial";
import { ScrollArea } from "@/components/ui/scroll-area";
import Iframe from 'react-iframe';
import { LiaAngleDoubleLeftSolid, LiaAngleDoubleRightSolid } from "react-icons/lia";
import CloseIcon from '@mui/icons-material/Close';
import { FiCheckCircle } from 'react-icons/fi'
import { IoVideocamOutline } from "react-icons/io5";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from '@mui/material';
const CourseDetails = () => {
  const [showRightGrid, setShowRightGrid] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const toggleRightGrid = () => {
    setShowRightGrid(!showRightGrid);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  return (
    <div className="flex flex-col w-full h-full text-gray-900 ">
      <Speed />
      <Navbar />
        <section className="flex-grow overflow-hidden bg-gray-100 dark:bg-gray-800 dark:text-white ">
            <Grid container spacing={1} className="sm:px-8 px-0 sm:py-8 py-0">
            {/* Left section: YouTube Iframe */}
            <Grid item xs={12} md={showRightGrid ? 9 : 12} className="relative ">
                <div className="relative">
                    <Iframe
                    url="https://www.youtube.com/embed/_uQrJ0TkZlc"
                    
                    id="youtube-iframe"
                    display="block"
                    position="relative"
                    className="sm:rounded-lg rounded-none shadow-lg w-full sm:h-[600px] h-[400px] "
                    />
                     <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                    <Button
                        onClick={toggleRightGrid}
                        variant="contained"
                        color="primary"
                        sx={{
                        borderRadius: '50%',
                        padding: '8px',
                        minWidth: '40px',
                        height: '40px',
                        boxShadow: 3,
                        }}
                    >
                        {showRightGrid ? (
                        <LiaAngleDoubleRightSolid className="text-white" />
                        ) : (
                        <LiaAngleDoubleLeftSolid className="text-white" /> 
                        )}
                    </Button>
                    </div>
                </div>
                <div className="p-4">
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    aria-label="course details tabs"
                    className="border-b border-gray-300 overflow-y-auto"
                >
                    <Tab
                    label="Overview"
                    sx={{
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        color: 'black'
                    }}
                    />
                    <Tab
                    label="Q&A"
                    sx={{
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        color: 'black'
                    }}
                    />
                    <Tab
                    label="Announcements"
                    sx={{
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        color: 'black'
                    }}
                    />
                </Tabs>
                <div className="p-4">
                {activeTab === 0 && (
                    <div className=" rounded-lg space-y-6 dark:text-white">
                        <Typography variant="h4" className="font-semibold text-gray-900  mb-4">
                        Overview of the Philippines
                        </Typography>

                        <Typography variant="body1" className="text-gray-800 mb-4">
                        <span className="font-semibold">Course Title:</span> Overview of the Philippines
                        </Typography>

                        <Typography variant="body1" className="text-gray-800 mb-4">
                        <span className="font-semibold">Course Subtitle:</span> An In-Depth Exploration of the Philippines
                        </Typography>

                        <Typography variant="body1" className="text-gray-800 mb-4">
                        <span className="font-semibold">Last Updated:</span> September 2024
                        </Typography>

                        <div className="space-y-4">
                        <Typography variant="h6" className="font-semibold text-gray-800">
                            Who This Course Is For:
                        </Typography>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>Travel enthusiasts looking to explore the Philippines.</li>
                            <li>Students studying Southeast Asian geography and culture.</li>
                            <li>Professionals interested in expanding their cultural knowledge.</li>
                            <li>Anyone planning to visit the Philippines and wanting to know more about the country.</li>
                        </ul>
                        </div>

                        <div className="space-y-4">
                        <Typography variant="h6" className="font-semibold text-gray-800">
                            Requirements:
                        </Typography>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>No prior knowledge required.</li>
                            <li>An interest in learning about the Philippines.</li>
                            <li>A desire to understand the cultural and historical aspects of the country.</li>
                            <li>Basic internet skills to access course materials.</li>
                        </ul>
                        </div>

                        <div className="space-y-4">
                        <Typography variant="h6" className="font-semibold text-gray-800">
                            What You'll Learn in This Course:
                        </Typography>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>The rich history and cultural heritage of the Philippines.</li>
                            <li>Major tourist destinations and hidden gems across the country.</li>
                            <li>The diverse languages, festivals, and traditions of the Philippines.</li>
                            <li>The economic landscape and opportunities available in the country.</li>
                        </ul>
                        </div>

                        <Typography variant="body1" className="opacity-50 mb-6">
                        This course offers an in-depth exploration of the Philippines, covering its geography, culture, history, and key attractions. Whether you're planning to visit or want to learn more about the country, this course provides essential insights.
                        </Typography>

                        <div className="space-y-4">
                        {[
                            "Learn about the rich history and cultural heritage of the Philippines",
                            "Explore major tourist destinations and hidden gems",
                            "Understand the diverse languages, festivals, and traditions",
                            "Discover the economic landscape and opportunities in the country"
                        ].map((text, index) => (
                            <div key={index} className="flex items-start space-x-3">
                            <FiCheckCircle className="h-6 w-6 text-blue-400" />
                            <Typography variant="body1" className="text-gray-700 leading-relaxed">
                                {text}
                            </Typography>
                            </div>
                        ))}
                        </div>
                    </div>
                    )}

                    {activeTab === 1 && (
                    <Typography variant="body1">
                        This section contains the course syllabus. You can list out the modules or chapters and any relevant details.
                    </Typography>
                    )}
                    {activeTab === 2 && (
                    <Typography variant="body1">
                        This section provides information about the course instructor. You can include their bio, qualifications, and experience.
                    </Typography>
                    )}
                    
                </div>
                </div>
            </Grid>

            {showRightGrid && (
                <Grid
                item
                xs={12}
                md={3}
                className="fixed top-[4.0rem] right-0 w-full h-screen overflow-y-auto sm:pr-8 pr-0"
                >
                <div className="flex justify-between items-center px-4 py-2  border-b rounded-s-md rounded-e-md  border-2 mt-5">
                    <Typography fontWeight="bold">Course Details</Typography>
                    <IconButton
                    onClick={toggleRightGrid}
                    className="md:hidden"
                    >
                    <CloseIcon className="dark:text-white" />
                    </IconButton>
                </div>
                <Divider />
                <ScrollArea className="">
                <Accordion type="single" collapsible className="w-full flex items-start justify-start text-start flex-col">
                    {sections.map((section, index) => (
                        <AccordionItem className="border bg-white rounded-md px-4 no-underline w-full mt-2" key={index} value={`section-${index}`}>
                        <AccordionTrigger className="text-gray-500">{section.title}</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex gap-2 flex-col">
                                {section.content.map((subtopic, subIndex) => (
                                    
                                <div key={subIndex} className="flex gap-2 items-center bg-gray-100 p-2 rounded-md cursor-pointer">
                                         <Checkbox />
                                    <div className="bg-blue-200 p-2 rounded-md">
                                    <IoVideocamOutline className="text-blue-600" />
                                    </div>
                                    <div className="flex flex-col">
                                    <span className="font-semibold">{subtopic.title}</span>
                                    <div className="flex items-center">
                                        <GoDot />
                                        <span className="text-xs">{subtopic.minutes} mins</span>
                                    </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </ScrollArea>
                </Grid>
            )}
            </Grid>
        </section>
    </div>
  );
};

export default CourseDetails;
