import React from 'react';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="block mx-auto h-screen w-full">
      {children}
    </section>
  );
}