import React from 'react';
import Image from 'next/image';

const ShapingFuture = () => {
  return (
    <div className="bg-black text-white py-20">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-[50px] font-bold tracking-wider uppercase">
            Shaping the future <br /> of performance
          </h2>
          <p className="text-neutral-400 max-w-md">
            We are the first to create connected ecosystems in fitness, creating
            seamless workout experiences.
          </p>
          <button className="border border-white text-white font-bold py-3 px-6 uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
            Discover our story
          </button>
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1517836947426-c26a192591a1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Man on a treadmill"
            width={800}
            height={600}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ShapingFuture;
