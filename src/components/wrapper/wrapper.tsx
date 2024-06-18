import React from 'react';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="block mx-auto my-10 h-screen">
      {children}
    </section>
  );
}