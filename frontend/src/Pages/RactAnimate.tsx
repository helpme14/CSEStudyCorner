 /*import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const items = ["Confidence", "Compassion", "Focus", "Dedication"];

const RactAnimate: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  // Define the animation properties
  const props = useSpring({
    opacity: 1,
    transform: 'translateY(0%)',
    from: { opacity: 0, transform: 'translateY(50%)' },
    reset: true,
    config: { duration: 2000 },
    onRest: () => {
      // Update the index after the animation completes
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    },
  });

  // Use a timeout to update the index after the animation duration
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 10000); // Duration of the animation

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className='inline-block'>
      <animated.div style={props} className="inline-block min-w-max">
        {items[index]}
      </animated.div>
    </div>
  );
};

export default RactAnimate; */
