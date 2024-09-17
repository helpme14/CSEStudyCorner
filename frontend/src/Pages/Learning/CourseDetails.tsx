import { useState } from "react";
import Navbar from "../Navbar";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, IconButton, Tabs, Tab, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Speed from "@/components/ui/speed-dial";
import { ScrollArea } from "@/components/ui/scroll-area";
import Iframe from 'react-iframe';
import { LiaAngleDoubleLeftSolid } from "react-icons/lia";
import CloseIcon from '@mui/icons-material/Close'; // Import close icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
        <div className="w-full flex text-foreground">
            <div className="flex flex-col w-full">
                <Speed />
                <Navbar />
                <section className="py-0 overflow-hidden">
                    <Grid container>
                        {/* Left section: YouTube Iframe */}
                        <Grid item xs={12} sm={12} md={showRightGrid ? 9 : 12} className="!pl-0 relative">
                            <Iframe
                                url="https://www.youtube.com/embed/_uQrJ0TkZlc"
                                width="100%"
                                height="600px"
                                id="youtube-iframe"
                                display="block"
                                position="relative"
                            />
                            <div className="">
                                        <Tabs 
                                            value={activeTab} 
                                            onChange={handleTabChange} 
                                            aria-label="course details tabs"
                                            className="px-4"
                                        >
                                            <Tab label="Overview"  sx={{
                                                fontSize: '0.8050rem',
                                                fontWeight: '600',
                                                color: 'black',
                                            }} />
                                            <Tab label="Syllabus"
                                            sx={{
                                                fontSize: '0.8050rem',
                                                fontWeight: '600',
                                                color: 'black',
                                            }} 
                                             />
                                            <Tab label="Instructor"
                                            sx={{
                                                fontSize: '0.8050rem',
                                                fontWeight: '600',
                                                color: 'black',
                                            }}  />
                                        </Tabs>
                                    <div className="p-4">
                                        {activeTab === 0 && (
                                        <Typography>
                                            This section contains an overview of the course. You can include information such as course objectives and key topics.
                                        </Typography>
                                    )}
                                    {activeTab === 1 && (
                                        <Typography>
                                            This section contains the course syllabus. You can list out the modules or chapters and any relevant details.
                                        </Typography>
                                    )}
                                    {activeTab === 2 && (
                                        <Typography>
                                            This section provides information about the course instructor. You can include their bio, qualifications, and experience.
                                        </Typography>
                                    )}
                                    </div>
                            </div>

                            {!showRightGrid && (
                                <div className="absolute top-60 -right-5">
                                    <Button
                                        onClick={toggleRightGrid}
                                        sx={{
                                            margin: '16px',
                                            backgroundColor: '#4b5563',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#4b5563',
                                                borderColor: '#4b5563',
                                            }
                                        }}
                                    >
                                        <LiaAngleDoubleLeftSolid className="h-10 w-8" />
                                    </Button>
                                </div>
                            )}
                        </Grid>

                        {showRightGrid && (
                            <Grid 
                                item 
                                xs={12} sm={12} md={3} 
                                className="!pl-0 xl:fixed xl:right-0 xl:top-30 xl:h-screen lg:relative"
                            >
                                <div className="flex justify-between items-center px-4 py-2">
                                    <h4 className="font-semibold text-lg">Course Details</h4>
                                    <IconButton onClick={toggleRightGrid}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>

                                <Accordion className="w-full">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Additional Details</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                This section contains additional details about the course. You can include any relevant information here, such as course objectives, prerequisites, or additional resources.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>

                                <Divider />
                                <Divider />
                                <ScrollArea className="p-4 h-full">
                                    
                                </ScrollArea>
                            </Grid>
                        )}
                    </Grid>
                </section>
            </div>
        </div>
    );
};

export default CourseDetails;
