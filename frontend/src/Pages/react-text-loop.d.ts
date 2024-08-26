declare module 'react-text-loop' {
    import * as React from 'react';
  
    interface TextLoopProps {
      children: React.ReactNode;
      interval?: number;
      // Add other props based on the library's documentation
    }
  
    const TextLoop: React.ComponentType<TextLoopProps>;
    export default TextLoop;
  }
  
  declare module '@heroicons/react/outline' {
    export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>>;
    export const StarIcon: React.FC<React.SVGProps<SVGSVGElement>>;
    export const LocationMarkerIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  }