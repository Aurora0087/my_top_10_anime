'use client'

import { motion } from "motion/react";

function page() {

  return (
    <div className=" w-screen h-screen grid place-content-center">

      {
        Array.from({length:10}).map((_,i)=>(
          <motion.div
          key={i}
          style={{
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            rotate:[0,360],
            scale:[1,50]
          }}
          transition={{
            ease:'easeInOut',
            duration:2.5,
            delay:0.1*i
          }}
      className=" absolute top-[50%] left-[50%] aspect-square w-16 h-16 border-[.5rem] border-[#fe00b0] rounded" />
        ))
      }
      
    </div>
  )
}

export default page