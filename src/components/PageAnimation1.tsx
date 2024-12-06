'use client'

import { motion } from "motion/react"

function PageAnimation1({imgs}:{imgs:string[]}) {

  const boxes = [
    {
      init: {
        opacity: 0,
        top: "40vh",
        left: "40vw",
      },
      ani: {
        opacity: [0, 1, 1],
        top: ["25vh", "20vh", "50%"],
        left: ["15vw", "10vw", "50%"],
      },
      transit: {
        ease: [[0.06, -0.38, 0, 0.99], [1, -0.1, 0.99, 1.3]],
        duration: 2,
        delay: 1.5,
        times: [0, 0.25, 1],
      },
      img:imgs[0]
    },
    {
      init: {
        opacity: 0,
        top: "75vh",
        left: "25vw",
      },
      ani: {
        opacity: [0, 1, 1],
        top: ["62vh", "65vh", "50%"],
        left: ["25vw", "20vw", "50%"],
      },
      transit: {
        ease: [[0.06, -0.38, 0, 0.99], [1, -0.1, 0.99, 1.3]],
        duration: 2,
        delay: 1.5,
        times: [0, 0.25, 1],
      },
      img:imgs[1]
    },
    {
      init: {
        opacity: 0,
        top: "5vh",
        left: "35vw",
      },
      ani: {
        opacity: [0, 1, 1],
        top: ["5vh", "0vh", "50%"],
        left: ["31vw", "30vw", "50%"],
      },
      transit: {
        ease: [[0.06, -0.38, 0, 0.99], [1, -0.1, 0.99, 1.3]],
        duration: 2,
        delay: 1.5,
        times: [0, 0.25, 1],
      },
      img:imgs[2]
    },
    {
      init: {
        opacity: 0,
        top: "80vh",
        left: "50vw",
      },
      ani: {
        opacity: [0, 1, 1],
        top: ["84vh", "85vh", "50%"],
        left: ["53vw", "55vw", "50%"],
      },
      transit: {
        ease: [[0.06, -0.38, 0, 0.99], [1, -0.1, 0.99, 1.3]],
        duration: 2,
        delay: 1.5,
        times: [0, 0.25, 1],
      },
      img:imgs[3]
    },
    {
      init: {
        opacity: 0,
        top: "60vh",
        left: "70vw",
      },
      ani: {
        opacity: [0, 1, 1],
        top: ["53vh", "55vh", "50%"],
        left: ["73vw", "75vw", "50%"],
      },
      transit: {
        ease: [[0.06, -0.38, 0, 0.99], [1, -0.1, 0.99, 1.3]],
        duration: 2,
        delay: 1.5,
        times: [0, 0.25, 1],
      },
      img:imgs[4]
    },
    {
      init: {
        opacity: 0,
        top: "16vh",
        left: "85vw",
      },
      ani: {
        opacity: [0, 1, 1],
        top: ["16vh", "15vh", "50%"],
        left: ["85vw", "87vw", "50%"],
      },
      transit: {
        ease: [[0.06, -0.38, 0, 0.99], [1, -0.1, 0.99, 1.3]],
        duration: 2,
        delay: 1.5,
        times: [0, 0.25, 1],
      },
      img:imgs[5]
    },
    {
      init: {
        opacity: 0,
        top: "12vh",
        left: "58vw",
      },
      ani: {
        opacity: [0, 1, 1],
        top: ["12vh", "10vh", "50%"],
        left: ["58vw", "60vw", "50%"],
      },
      transit: {
        ease: [[0.06, -0.38, 0, 0.99], [1, -0.1, 0.99, 1.3]],
        duration: 2,
        delay: 1.5,
        times: [0, 0.25, 1],
      },
      img:imgs[6]
    },
    {
      init: {
        opacity: 0,
        top: "60vh",
        left: "75vw",
      },
      ani: {
        opacity: [0, 1, 1],
        top: ["75vh", "80vh", "50%"],
        left: ["80vw", "85vw", "50%"],
      },
      transit: {
        ease: [[0.06, -0.38, 0, 0.99], [1, -0.1, 0.99, 1.3]],
        duration: 2,
        delay: 1.5,
        times: [0, 0.25, 1],
      },
      img:imgs[7]
    },
    {
      init: {
        opacity: 0,
        top: "60vh",
        left: "75vw",
      },
      ani: {
        opacity: [0, 1, 1],
        top: ["80vh", "85vh", "50%"],
        left: ["14vw", "15vw", "50%"],
      },
      transit: {
        ease: [[0.06, -0.38, 0, 0.99], [1, -0.1, 0.99, 1.3]],
        duration: 2,
        delay: 1.5,
        times: [0, 0.25, 1],
      },
      img:imgs[8]
    },
    {
      init: {
        opacity: 0,
        top: "53vh",
        left: "35vw",
      },
      ani: {
        opacity: [0, 1, 1],
        top: ["53vh", "50vh", "50%"],
        left: ["38vw", "40vw", "50%"],
      },
      transit: {
        ease: [[0.06, -0.38, 0, 0.99], [1, -0.1, 0.99, 1.3]],
        duration: 2,
        delay: 1.5,
        times: [0, 0.25, 1],
      },
      img:imgs[9]
    },
  ]

  return (
    <motion.div
    animate={{
      scale:[1,0],
      borderRadius:[0,99999999],
      opacity:[1,0]
    }}
    transition={{
      ease: 'easeInOut',
      duration: .5,
      delay: 3.6
    }}
    className=" fixed top-0 w-screen h-screen overflow-hidden bg-[#2600fe]">
      <motion.div
        className=" w-full h-screen flex relative">
        {
          Array.from({ length: 3 }).map((_, i) => (
            <motion.div
            initial={{
              y:'100vh'
            }}
            key={i}
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
          className=" pointer-events-none fixed top-0 left-0 w-screen h-screen overflow-hidden uppercase text-[8vw] font-[900] grid place-content-center tracking-tighter leading-tight">
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
                  backgroundColor: [i === 2 ? '#fe00b0' : '', i === 2 ? '#fe00b0' : '', i === 2 ? '#fff429' : '']
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

        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            ease: 'easeInOut',
            duration: .5,
            delay: 1.5
          }}
          className=" absolute top-0 left-0 w-screen h-screen bg-[#fff429] text-center grid place-content-center text-3xl md:text-6xl font-extrabold text-[#2600fe] uppercase tracking-tighter leading-tight">
          <div className=" overflow-hidden">
            <motion.p
              initial={{
                y: 100,
              }}
              animate={{
                y: 0,
              }}
              transition={{
                ease: 'circInOut',
                duration: .75,
                delay: 1.6
              }}
            >this top 10,</motion.p>
          </div>
          <div className=" overflow-hidden">
            <motion.p
              initial={{
                y: 100,
              }}
              animate={{
                y: 0,
              }}
              transition={{
                ease: 'circInOut',
                duration: .75,
                delay: 1.6
              }}
            >its the best of the best</motion.p>
          </div>
        </motion.div>

        {
          // images
          <>
            {boxes.map((b, i) => (
              <motion.div
                key={i}
                initial={b.init}
                animate={b.ani}
                transition={b.transit}
                style={{
                  transform: "translate(-50%, -50%)",
                }}
                className=" absolute h-[25vh] aspect-[5/7] rounded-xl overflow-hidden bg-[#2600fe]"
              >
                <img src={b.img} alt="" className=" w-full h-full object-cover" />
              </motion.div>
            ))}
          </>
        }

      </motion.div>
    </motion.div>
  )
}

export default PageAnimation1