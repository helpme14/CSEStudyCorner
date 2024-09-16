import Navbar from "../Navbar";

import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Speed from "@/components/ui/speed-dial";
import Iframe from 'react-iframe';

const CourseDetails = () => {
    return (
        <div className="w-full flex text-foreground">
            <div className="flex flex-col w-full">
                <Speed />
                <Navbar />
                <section className="py-0">
                    <Grid container>
                        <Grid item xs={12} sm={12} md={9} className="!pl-0">
                            <Iframe
                                url="https://www.youtube.com/embed/_uQrJ0TkZlc" // Use embed URL
                                width="100%" // Use percentage for full width
                                height="700px"
                                id="youtube-iframe"
                                display="block"
                                position="relative"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={3}>
                            <Accordion className="w-full">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Course Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        This section contains additional details about the course. You can include any relevant information here, such as course objectives, prerequisites, or additional resources.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </section>
            </div>
        </div>
    );
};

export default CourseDetails;
