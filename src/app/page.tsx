'use client';

import { motion } from "framer-motion";

const refImages = [
  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127720-ADJgIrUVMdU9.jpg",
  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx163134-Y0r8AGBeVlCi.jpg",
  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-2ldCj6QywuOa.jpg",
  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx163146-f2vYhmiGn6dM.png",
  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx176301-AclxpmzlKoBM.jpg",
  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx172019-y0dLlAdingR2.jpg",
  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-gHSraOSa0nBG.jpg",
  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21745-vHwC1VKoL6zf.png",
  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx125367-vV8WqtLQpT2J.png",
  "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx103047-odblDHHEdehK.jpg",
];

export default function Home() {
  return (
    <div className="relative h-screen w-full text-center overflow-hidden grid place-content-center bg-[#fff429]">
      {/* Perspective Wrapper */}
      <div className="perspective z-20">
        {/* Rotating Carousel */}
        <motion.div
          className="cycleAniSlider"
          animate={{
            rotateY: [0, 360],
            rotateX: [0, 8,0, -4, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: "linear",
          }}
        >
          {refImages.map((img, i) => {
            const angle = i * (360 / refImages.length);

            return (
              <motion.div
                key={i}
                initial={{
                  transform: `rotateY(0deg) translateZ(1050px)`
                }}
                animate={{
                  transform: `rotateY(${angle}deg) translateZ(450px)`,
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut"
                }}
                className=" absolute overflow-hidden w-[200px] h-[300px] rounded-lg border-2 border-[#0061fe] hover:border-transparent focus:border-transparent rotate-45"
              >
                <img
                  src={img}
                  alt={`Image ${i}`}
                  className="object-cover w-full h-full grayscale hover:grayscale-0 focus:grayscale-0"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* top text */}
      <div className=" absolute top-[10vh] capitalize text-[#fe00b0] text-6xl md:text-[7vw] text-center font-bold w-screen z-10">
        <h2>Create the top 10</h2>
      </div>

      <div
      className=" text-stroke absolute top-[10vh] capitalize text-transparent text-6xl md:text-[7vw] text-center font-bold w-screen z-20">
        <h2>Create the top 10</h2>
      </div>

      {/* buttom text */}
      <div className=" absolute bottom-[20vh] capitalize text-[#fe00b0] text-6xl md:text-[7vw] text-center font-bold w-screen z-10">
        <h2>of your animes.</h2>
      </div>
      <div className="text-stroke absolute bottom-[20vh] capitalize text-transparent text-6xl md:text-[7vw] text-center font-bold w-screen z-20">
        <h2>of your animes.</h2>
      </div>

      <div className=" absolute bottom-10 w-screen grid place-content-center z-20">
        <motion.a
        initial={{
          scale:0,
        }}
        animate={{
          scale:[.9,1,.9],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        whileTap={{
          scale:.5
        }}
        href='/choice' className="bg-[#fe00b0] rounded-full px-16 py-6 font-extrabold overflow-hidden relative text-xl md:text-2xl text-nowrap text-center grid place-content-center">
          Make my top
        </motion.a>
      </div>
    </div>
  );
}
