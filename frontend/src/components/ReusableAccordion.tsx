// ReusableAccordion.tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { IoVideocamOutline } from "react-icons/io5";
import { GoDot } from "react-icons/go";
import { Checkbox } from "@mui/material";

interface Subtopic {
  title: string;
  minutes: number;
}

interface Section {
  title: string;
  content: Subtopic[];
}

const ReusableAccordion = ({ sections }: { sections: Section[] }) => (
  <Accordion type="single" collapsible className="w-full flex flex-col">
    {sections.map((section, index) => (
      <AccordionItem className="border bg-white rounded-md px-4 w-full mt-2" key={index} value={`section-${index}`}>
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
);

export default ReusableAccordion;
