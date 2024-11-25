'use client'

import { motion } from "motion/react"

function PageAnimation1() {
  return (
    <motion.div className=" fixed top-0 w-screen h-screen overflow-hidden bg-[#2600fe]">
      <motion.div
        className=" w-full h-screen flex relative">
        {
          Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              animate={{
                y: ['100vh', 0],
              }}
              transition={{
                ease: 'easeInOut',
                duration: .5,
                delay: i * 0.15
              }}
              className={`w-full h-full bg-[#fe00b0]`}>
            </motion.div>
          ))
        }
        <motion.div
          className=" fixed top-0 left-0 w-screen h-screen overflow-hidden uppercase text-[8vw] font-[900] grid place-content-center tracking-tighter leading-tight">
          <div className=" text-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.p
                key={i}
                initial={{
                  y: 1000
                }}
                animate={{
                  y: [1000, 0, i === 2 ? 0 : i < 2 ? -2500 : 2500], // Keyframe animation for `y`
                  scale: [1, 1, 25], // Scale starts normal, then stays the same, then scales up
                  x: ["0vw", "0vw", "-5vw"], // X stays for first two frames, then animates
                  backgroundColor: [i === 2 ?'#fe00b0':'',i === 2 ?'#fe00b0':'',i === 2 ?'#fff429':'']
                }}
                transition={{
                  ease: "easeInOut",
                  duration: 1.5, // Total duration of animation
                  times: [0, 0.8 / 1.5, 1], // Map 0.8s to keyframe stop for `y`
                }}
                className={`${i === 2 ? 'text-[#fff429]' : 'text-stroke-yellow text-transparent'}`}
              >
                wooooow
              </motion.p>
            ))
            }
          </div>
        </motion.div>

        
      </motion.div>
    </motion.div>
  )
}

export default PageAnimation1