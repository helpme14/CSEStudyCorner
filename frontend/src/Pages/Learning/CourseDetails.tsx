// CourseDetails.tsx
import { useState } from "react";
import Navbar from "../Navbar";
import sections from "../modules/sections";
import { Typography, Button, Tabs, Tab, Grid, Divider, IconButton } from '@mui/material';
import Iframe from 'react-iframe';
import { LiaAngleDoubleLeftSolid, LiaAngleDoubleRightSolid } from "react-icons/lia";
import CloseIcon from '@mui/icons-material/Close';
import { tabLabels, overviewContent, whoThisCourseIsFor, requirements, courseLearnings, } from "../modules/tabsConfig";
import Speed from "@/components/ui/speed-dial";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReusableAccordion from "@/components/ReusableAccordion";
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

  
const CourseDetails = () => {
  const [showRightGrid, setShowRightGrid] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const toggleRightGrid = () => setShowRightGrid(!showRightGrid);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setActiveTab(newValue);

  return (
    <div className="flex flex-col w-full h-full text-gray-900">
      <Speed />
      <Navbar />
      <section className="flex-grow overflow-hidden bg-gray-100 dark:bg-gray-800 dark:text-white">
        <Grid container spacing={1} className="px-0 py-0 sm:px-8 sm:py-8">
          {/* Left section: YouTube Iframe */}
          <Grid item xs={12} md={showRightGrid ? 9 : 12} className="relative">
            <Iframe
              url="https://www.youtube.com/embed/_uQrJ0TkZlc"
              className="sm:rounded-lg rounded-none shadow-lg w-full sm:h-[600px] h-[400px]"
            />
            <div className="absolute hidden transform -translate-y-1/2 top-1/4 right-2 sm:block">
              <Button onClick={toggleRightGrid} variant="contained" color="primary" sx={{ borderRadius: '50%', padding: '8px', minWidth: '40px', height: '40px', boxShadow: 3 }}>
                {showRightGrid ? <LiaAngleDoubleRightSolid className="text-white" /> : <LiaAngleDoubleLeftSolid className="text-white" />}
              </Button>
            </div>

            {/* Tabs */}
            <div className="p-4">
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="course details tabs" className="overflow-y-auto border-b border-gray-300">
                {tabLabels.map((label, index) => (
                  <Tab key={index} label={label} sx={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'black' }} />
                ))}
              </Tabs>

              {/* Tab Content */}
              <div className="p-4">
                {activeTab === 0 && (
                  <div className="space-y-6 rounded-lg dark:text-white">
                    <Typography variant="h4" className="mb-4 font-semibold text-gray-900">Overview of the Philippines</Typography>
                    
                    {overviewContent.map((item, index) => (
                      <Typography key={index} variant="body1" className="mb-4 text-gray-800">
                        <span className="font-semibold">{item.title}:</span> {item.content}
                      </Typography>
                    ))}

                    <Typography variant="h6" className="font-semibold text-gray-800">Who This Course Is For:</Typography>
                    <ul className="pl-5 space-y-2 text-gray-700 list-disc">
                      {whoThisCourseIsFor.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>


                    <Typography variant="h6" className="font-semibold text-gray-800">Requirements</Typography>
                    <ul className="pl-5 space-y-2 text-gray-700 list-disc">
                      {requirements.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>

                    <Typography variant="h6" className="font-semibold text-gray-800">What You'll Learn in This Course:</Typography>
                    <ul className="pl-5 space-y-2 text-gray-700 list-disc">
                      {courseLearnings.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                    {/* Similar for requirements, courseLearnings, etc. */}
                  </div>
                )}

                {activeTab === 1 && <Typography variant="body1">This section contains the course syllabus.</Typography>}
                {activeTab === 2 && <Typography variant="body1">This section provides information about the course instructor.</Typography>}
              </div>
            </div>
          </Grid>

          {showRightGrid && (
            <Grid item xs={12} md={3} className="fixed top-[4.0rem] right-0 w-full h-screen overflow-y-auto sm:pr-8 pr-0 sm:block hidden">
              <div className="flex items-center justify-between px-4 py-2 mt-5 border-2 border-b rounded-s-md rounded-e-md">
                <Typography fontWeight="bold">Course Details</Typography>
                <IconButton onClick={toggleRightGrid} className="md:hidden">
                  <CloseIcon className="dark:text-white" />
                </IconButton>
              </div>
              <Divider />
              <ScrollArea>
                <ReusableAccordion sections={sections} />
              </ScrollArea>
            </Grid>
          )}
        </Grid>
        <Drawer>
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent  className="z-50">
                <DrawerTitle className="text-center">Course Details</DrawerTitle>
                <ReusableAccordion sections={sections} />
            </DrawerContent>
            </Drawer>
      </section>
    </div>
  );
};

export default CourseDetails;
