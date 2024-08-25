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
  