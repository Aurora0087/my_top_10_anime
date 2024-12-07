"use client"

import { ReactLenis } from "@studio-freight/react-lenis";

function LenisScroll({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.02,
        duration: 1.5,
        smoothWheel:true,
        touchMultiplier:2,
        autoResize:true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default LenisScroll;
