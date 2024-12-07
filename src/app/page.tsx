'use client';

import PerspectiveText from "@/components/PerspectiveText";
import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { MouseEventHandler } from "react";

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

      <FloatingImages />
      {/* top text */}
      <div className=" absolute top-[10vh] capitalize text-[#fe00b0] text-6xl md:text-[7vw] text-center font-bold w-screen z-10 pointer-events-none">
        <h2>Create the top 10</h2>
      </div>

      {/* buttom text */}
      <div className=" absolute bottom-[20vh] capitalize text-[#fe00b0] text-6xl md:text-[7vw] text-center font-bold w-screen z-10 pointer-events-none">
        <h2>of your animes.</h2>
      </div>

      <div className=" absolute bottom-10 w-screen grid place-content-center z-20 pointer-events-none">
        <motion.a
          initial={{
            scale: 0,
          }}
          animate={{
            scale: [.9, 1, .9],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          whileTap={{
            scale: .5
          }}
          href='/choice' className="bg-[#fe00b0] rounded-full px-16 py-6 font-extrabold overflow-hidden relative text-xl md:text-2xl text-nowrap text-center grid place-content-center pointer-events-auto">
          <PerspectiveText label={"Make my top"} />
        </motion.a>
      </div>
    </div>
  );
}


function FloatingImages() {

  const xPcnt = useSpring(0, { bounce: 0 });
  const yPcnt = useSpring(0, { bounce: 0 });


  const moveX1 = useTransform(
    xPcnt,
    [-0.5, 0.5],
    ['-70px', '70px']
  )
  const moveY1 = useTransform(
    xPcnt,
    [-0.5, 0.5],
    ['-70px', '70px']
  )
  const moveX2 = useTransform(
    xPcnt,
    [-0.5, 0.5],
    ['-35px', '35px']
  )
  const moveY2 = useTransform(
    xPcnt,
    [-0.5, 0.5],
    ['-35px', '35px']
  )
  const moveX3 = useTransform(
    xPcnt,
    [-0.5, 0.5],
    ['-20px', '20px']
  )
  const moveY3 = useTransform(
    xPcnt,
    [-0.5, 0.5],
    ['-20px', '20px']
  )

  function getMousePosition(e: React.MouseEvent<Element, MouseEvent>) {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();

    const currentMouseX = e.clientX - left;
    const currentMouseY = e.clientY - top;

    return {
      currentMouseX,
      currentMouseY,
      containeWidth: width,
      containeHeight: height,
    }
  }

  const mouseMove: MouseEventHandler = (e) => {
    const { containeHeight, containeWidth, currentMouseX, currentMouseY } = getMousePosition(e);

    console.log(containeHeight, containeWidth, currentMouseX, currentMouseY);

    xPcnt.set(currentMouseX / containeWidth - 0.5);
    yPcnt.set(currentMouseY / containeHeight - 0.5);
  }

  const mouseLeave = () => {
    xPcnt.set(0);
    yPcnt.set(0);
  }


  return (
    <div onMouseMove={mouseMove} onMouseLeave={mouseLeave} className=" absolute w-full h-full">
      <motion.div
        style={{
          x: moveX3,
          y: moveY3
        }}
        className=" absolute w-screen h-full pointer-events-none">
        <motion.div
        initial={{
          x:-10,
          opacity:0,
          y:10,
        }}
        animate={{
          x:[-10,0],
          y:[10,0],
          opacity:[0.2,1]
        }}
        transition={{
          duration: .3,
          ease: 'easeInOut'
        }}
        className=" absolute  bottom-8 left-[3%] aspect-[1/1.6] w-[20vw] max-w-[150px] rounded-xl overflow-hidden opacity-90">
          <ImageCard imgUrl={refImages[0]} />
        </motion.div>
        <motion.div
        initial={{
          x:10,
          opacity:0,
          y:10,
        }}
        animate={{
          x:[10,0],
          y:[10,0],
          opacity:[0.2,1]
        }}
        transition={{
          duration: .3,
          ease: 'easeInOut'
        }}
        className=" absolute bottom-[20%] md:bottom-[20%] right-[10%] aspect-[1/1.6] w-[20vw] max-w-[150px] rounded-xl overflow-hidden">
          <ImageCard imgUrl={refImages[1]} />
        </motion.div>
        <motion.div
        initial={{
          x:10,
          opacity:0,
          y:-10,
        }}
        animate={{
          x:[10,0],
          y:[-10,0],
          opacity:[0.2,1]
        }}
        transition={{
          duration: .3,
          ease: 'easeInOut'
        }}
        className=" absolute top-16 right-48 aspect-[1/1.6] w-[20vw] max-w-[150px] rounded-xl overflow-hidden">
          <ImageCard imgUrl={refImages[4]} />
        </motion.div>
      </motion.div>
      <motion.div
        style={{
          x: moveX2,
          y: moveY2
        }}
        className=" absolute w-screen h-full pointer-events-none opacity-95">
        <motion.div
        initial={{
          x:-10,
          opacity:0,
          y:-10,
        }}
        animate={{
          x:[-50,0],
          y:[-50,0],
          opacity:[0.2,1]
        }}
        transition={{
          duration: .5,
          ease: 'easeInOut'
        }}
        className=" absolute top-8 right-10 aspect-[1/1.6] w-[20vw] max-w-[150px] rounded-xl overflow-hidden">
          <ImageCard imgUrl={refImages[2]} />
        </motion.div>
        <motion.div
        initial={{
          x:50,
          opacity:0,
          y:-80,
        }}
        animate={{
          x:[50,0],
          y:[-80,0],
          opacity:[0.2,1]
        }}
        transition={{
          duration: .5,
          ease: 'easeInOut'
        }}
        className=" absolute top-32 right-[50%] aspect-[1/1.6] w-[20vw] max-w-[150px] rounded-xl overflow-hidden">
          <ImageCard imgUrl={refImages[5]} />
        </motion.div>
        <motion.div
        initial={{
          x:-50,
          opacity:0,
          y:80,
        }}
        animate={{
          x:[-50,0],
          y:[80,0],
          opacity:[0.2,1]
        }}
        transition={{
          duration: .5,
          ease: 'easeInOut'
        }}
        className=" absolute bottom-[35%] md:bottom-[8%] left-[20%] md:right-[35%] aspect-[1/1.6] w-[20vw] max-w-[150px] rounded-xl overflow-hidden">
          <ImageCard imgUrl={refImages[9]} />
        </motion.div>
        
      </motion.div>
      <motion.div
        style={{
          x: moveX1,
          y: moveY1
        }}
        className=" absolute w-full h-full pointer-events-none">
        <motion.div
        initial={{
          x:-50,
          opacity:0,
          y:10,
        }}
        animate={{
          x:[-50,0],
          y:[10,0],
          opacity:[0.2,1]
        }}
        transition={{
          duration: .75,
          ease: 'easeInOut'
        }}
        className=" absolute bottom-[10%] left-[25%] aspect-[1/1.6] w-[20vw] max-w-[150px] rounded-xl overflow-hidden">
          <ImageCard imgUrl={refImages[7]} />
        </motion.div>
        <motion.div
        initial={{
          x:10,
          opacity:0,
          y:-30,
        }}
        animate={{
          x:[10,0],
          y:[-30,0],
          opacity:[0.2,1]
        }}
        transition={{
          duration: .75,
          ease: 'easeInOut'
        }}
        className=" absolute top-5 left-[5%] aspect-[1/1.6] w-[20vw] max-w-[150px] rounded-xl overflow-hidden">
          <ImageCard imgUrl={refImages[6]} />
        </motion.div>
        <motion.div
        initial={{
          x:50,
          opacity:0,
          y:30,
        }}
        animate={{
          x:[50,0],
          y:[30,0],
          opacity:[0.2,1]
        }}
        transition={{
          duration: .75,
          ease: 'easeInOut'
        }}
        className=" absolute bottom-[25%] right-[30%] aspect-[1/1.6] w-[20vw] max-w-[150px] rounded-xl overflow-hidden">
          <ImageCard imgUrl={refImages[8]} />
        </motion.div>
        
      </motion.div>
    </div>
  )
}

function ImageCard({ imgUrl }: { imgUrl: string }) {
  return (
    <div className=" relative w-full h-full group border-4 border-[#0061fe] bg-[#0061fe] rounded-xl">
      <Image src={imgUrl} width={1000} height={1000} alt="" className=" w-full h-full object-cover" />
      <motion.div
        style={{
          filter: 'hue-rotate(180deg)'
        }}
        whileHover={{
          WebkitMaskSize: '105% 105%',
        }}
        transition={{
          duration: .3,
          ease: 'easeInOut'
        }}
        className="absolute transition-all img-mask top-0 w-full h-full overflow-hidden pointer-events-auto">
        <Image src={imgUrl} width={1000} height={1000} alt="" className=" w-full h-full object-cover" />
      </motion.div>
    </div>
  )
}