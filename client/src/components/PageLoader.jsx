import React from 'react';
import { LoaderCircle } from 'lucide-react';

const PageLoader = () => {
  return (
    <div className='min-h-screen h-full flex items-center justify-center'>
      <LoaderCircle className='animate-spin size-10' />
    </div>
  );
};

export default PageLoader;
