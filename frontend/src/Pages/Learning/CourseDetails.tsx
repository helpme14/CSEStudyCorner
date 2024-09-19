import { useState } from "react";
import Navbar from "../Navbar";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Speed from "@/components/ui/speed-dial";
import { ScrollArea } from "@/components/ui/scroll-area";
import Iframe from 'react-iframe';
import { LiaAngleDoubleLeftSolid, LiaAngleDoubleRightSolid } from "react-icons/lia";
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IoVideocamOutline } from "react-icons/io5";
import { GoDot } from "react-icons/go";
import { Checkbox } from '@mui/material';
import { FiBookOpen } from 'react-icons/fi'

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
        <section className="flex-grow overflow-hidden ">
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
                    <div className=" bg-white shadow-lg rounded-lg">
                    <Typography variant="h5" className="font-bold text-gray-800 mb-4">
                      Overview of the Philippines
                    </Typography>
                    <div className="space-y-4">
                      <Typography variant="body1" className="text-gray-700">
                        This course offers an in-depth exploration of the Philippines, covering its geography, culture, history, and key attractions. Whether you're planning to visit or want to learn more about the country, this course provides essential insights.
                      </Typography>
                      
                      <div className="flex items-center space-x-2">
                        <FiBookOpen className="h-6 w-6 text-blue-500" />
                        <Typography variant="body1" className="text-gray-700">
                          Learn about the rich history and cultural heritage of the Philippines
                        </Typography>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <FiBookOpen className="h-6 w-6 text-blue-500" />
                        <Typography variant="body1" className="text-gray-700">
                          Explore major tourist destinations and hidden gems
                        </Typography>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <FiBookOpen className="h-6 w-6 text-blue-500" />
                        <Typography variant="body1" className="text-gray-700">
                          Understand the diverse languages, festivals, and traditions
                        </Typography>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <FiBookOpen className="h-6 w-6 text-blue-500" />
                        <Typography variant="body1" className="text-gray-700">
                          Discover the economic landscape and opportunities in the country
                        </Typography>
                      </div>
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
                className="fixed top-[4.5rem] right-0 h-screen overflow-y-auto bg-white  sm:pr-8 pr-0"
                >
                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b rounded-s-md rounded-e-md border-gray-300 mt-3">
                    <Typography variant="h6" fontWeight="bold">Course Details</Typography>
                    <IconButton
                    onClick={toggleRightGrid}
                    className="md:hidden"
                    >
                    <CloseIcon />
                    </IconButton>
                </div>
                <Divider />
                <ScrollArea className="">
                    <Accordion className="border border-gray-200 rounded-lg mb-2 mt-2">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <div className="flex flex-col">
                            <Typography variant="body2" fontWeight="bold">
                                Section 1: Introduction to General Information
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                0 / 5 | 25mins
                            </Typography>
                        </div>
                    </AccordionSummary>
                        <AccordionDetails>
                            {/* First item with checkbox */}
                            <div className="flex items-center gap-2 mb-2">
                                <Checkbox />
                                <div className="bg-gray-200 p-2 rounded-full">
                                    <IoVideocamOutline className="text-gray-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-base font-semibold"> Overview of the Philippines</span>
                                    <div className="flex items-center">
                                        <GoDot />
                                        <span className="text-xs">5mins</span>
                                    </div>
                                </div>
                            </div>
                            {[
                                { title: "History of the Philippines", duration: "5mins" },
                                { title: "Geography and Climate", duration: "4mins" },
                                { title: "Culture and Traditions", duration: "6mins" },
                                { title: "Economic Overview", duration: "5mins" },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <Checkbox />
                                    <div className="bg-gray-200 p-2 rounded-full">
                                        <IoVideocamOutline className="text-gray-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-base font-semibold">{item.title}</span>
                                        <div className="flex items-center">
                                            <GoDot />
                                            <span className="text-xs">{item.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="border border-gray-200 rounded-lg mb-2 mt-2">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <div className="flex flex-col">
                            <Typography variant="body2" fontWeight="bold">
                                Section 2: Introduction to General Information
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                0 / 5 | 25mins
                            </Typography>
                        </div>
                    </AccordionSummary>
                        <AccordionDetails>
                            {/* First item with checkbox */}
                            <div className="flex items-center gap-2 mb-2">
                                <Checkbox />
                                <div className="bg-gray-200 p-2 rounded-full">
                                    <IoVideocamOutline className="text-gray-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-base font-semibold"> Overview of the Philippines</span>
                                    <div className="flex items-center">
                                        <GoDot />
                                        <span className="text-xs">5mins</span>
                                    </div>
                                </div>
                            </div>
                            {[
                                { title: "History of the Philippines", duration: "5mins" },
                                { title: "Geography and Climate", duration: "4mins" },
                                { title: "Culture and Traditions", duration: "6mins" },
                                { title: "Economic Overview", duration: "5mins" },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <Checkbox />
                                    <div className="bg-gray-200 p-2 rounded-full">
                                        <IoVideocamOutline className="text-gray-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-base font-semibold">{item.title}</span>
                                        <div className="flex items-center">
                                            <GoDot />
                                            <span className="text-xs">{item.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="border border-gray-200 rounded-lg mb-2 mt-2">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <div className="flex flex-col">
                            <Typography variant="body2" fontWeight="bold">
                                Section 3: Introduction to General Information
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                0 / 5 | 25mins
                            </Typography>
                        </div>
                    </AccordionSummary>
                        <AccordionDetails>
                            {/* First item with checkbox */}
                            <div className="flex items-center gap-2 mb-2">
                                <Checkbox />
                                <div className="bg-gray-200 p-2 rounded-full">
                                    <IoVideocamOutline className="text-gray-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-base font-semibold"> Overview of the Philippines</span>
                                    <div className="flex items-center">
                                        <GoDot />
                                        <span className="text-xs">5mins</span>
                                    </div>
                                </div>
                            </div>
                            {[
                                { title: "History of the Philippines", duration: "5mins" },
                                { title: "Geography and Climate", duration: "4mins" },
                                { title: "Culture and Traditions", duration: "6mins" },
                                { title: "Economic Overview", duration: "5mins" },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <Checkbox />
                                    <div className="bg-gray-200 p-2 rounded-full">
                                        <IoVideocamOutline className="text-gray-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-base font-semibold">{item.title}</span>
                                        <div className="flex items-center">
                                            <GoDot />
                                            <span className="text-xs">{item.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </AccordionDetails>
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
