import { SpeedDial } from 'primereact/speeddial';
import Tooltip from '@mui/material/Tooltip';
import { IoMdMenu } from "react-icons/io";
import { GoHome, GoRepo, GoBookmark, GoGear } from "react-icons/go";

const App = () => {
  const items = [
    {
      label: 'Settings',
      icon: <GoGear className='h-8 w-5' />,
      className: "bg-white shadow-md text-blue-500 border border-gray-400 cursor-pointer",
      tooltip: 'Open Settings'
    },
    {
      label: 'Saved',
      icon: <GoBookmark className='h-8 w-5' />,
      className: "bg-white shadow-md text-blue-500 border border-gray-400 cursor-pointer",
      tooltip: 'View Saved Items'
    },
    {
      label: 'Courses',
      icon: <GoRepo className='h-7 w-4' />,
      className: "bg-white shadow-md text-blue-500 border border-gray-400 cursor-pointer",
      tooltip: 'Browse Courses'
    },
    {
      label: 'Home',
      icon: <GoHome className='h-9 w-5' />,
      className: "bg-white shadow-md text-blue-500 border border-gray-400 cursor-pointer",
      tooltip: 'Go to Home'
    },
  ];

  return (
    <div>
      <SpeedDial
        model={items.map((item) => ({
          ...item,
          command: () => { console.log(`${item.label} clicked`); },
          template: (item) => (
            <Tooltip title={item.tooltip} placement="left">
              <div className={`p-speeddial-action ${item.className}`}>
                {item.icon}
              </div>
            </Tooltip>
          )
        }))}
        radius={120}
        direction="up"
        style={{
          position: 'fixed',
          right: '1rem', // Adjusted for responsiveness
          bottom: '1rem', // Adjusted for responsiveness
          zIndex: 40
        }}
        buttonClassName="bg-blue-500 opacity-75 text-white"
        showIcon={<IoMdMenu />} hideIcon="pi pi-times"
      />
    </div>
  );
};

export default App;