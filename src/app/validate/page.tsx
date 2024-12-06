'use client'
import PageAnimation1 from "@/components/PageAnimation1";
import axios from "axios";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";

function extractImageUrls(): string[] {
    const searchParams = useSearchParams();
    const imageUrls: string[] = [];

    searchParams.forEach((value, key) => {
        if (!isNaN(Number(key))) { // Ensure the key is a number
            imageUrls.push(value); // Add the image URL to the array
        }
    });

    return imageUrls;
}

function page() {

    const imageUrls = extractImageUrls();


    if (imageUrls.length !== 10) return (
        <div className=" w-screen h-screen bg-[#fff429] grid place-content-center">
            <motion.div className=" bg-[#2600fe] capitalize rounded-xl text-center text-6xl font-extrabold w-[80vw] px-4 py-16">

                <a href="/chioce">Please choice Your Top 10 Animes</a>
            </motion.div>
        </div>
    )

    const [downloadType, setDownloadType] = useState<'image' | 'video'>('image');

    return (
        <>
            <PageAnimation1 imgs={imageUrls} />
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    ease: 'easeInOut',
                    duration: .25,
                    delay: 3.8
                }}
                className="w-screen h-screen overflow-hidden bg-[#fff429] relative">
                <motion.div
                    initial={{
                        top: '50%',
                        left: '50%',
                    }}
                    animate={{
                        top: '90vh',
                        left: '90vw',
                    }}
                    transition={{
                        ease: 'easeInOut',
                        duration: .5,
                        delay: 4
                    }}
                    style={{
                        transform: "translate(-50%, -50%)",
                    }}
                    className=" w-20 h-20 absolute rounded-full border-2 border-black z-50">

                </motion.div>

                <motion.a
                    href="/choice"
                    initial={{
                        top: '50%',
                        left: '50%',
                    }}
                    animate={{
                        top: '90vh',
                        left: '10vw',
                    }}
                    transition={{
                        ease: 'easeInOut',
                        duration: .5,
                        delay: 4
                    }}
                    style={{
                        transform: "translate(-50%, -50%)",
                    }}
                    className="w-20 h-20 absolute rounded-full cursor-pointer overflow-hidden z-50 bg-[#fff429]">
                    <img src='/back.svg' alt="" className="w-full h-full object-fill" />
                </motion.a>

                <motion.div
                    initial={{
                        top: '50%',
                        scale: 0,
                    }}
                    animate={{
                        top: '5vh',
                        scale: 1,
                    }}
                    transition={{
                        ease: 'easeInOut',
                        duration: .5,
                        delay: 4
                    }}
                    className=" w-full h-20 absolute flex justify-center items-center gap-4 capitalize z-50">
                    <button onClick={() => setDownloadType('image')} className=" bg-[#2600fe] px-8 py-2 rounded-full relative">Images</button>
                    <button onClick={() => setDownloadType('video')} className=" bg-[#2600fe] px-8 py-2 rounded-full relative">Video</button>
                </motion.div>

                <TopImages imags={imageUrls} show={downloadType === 'image'} />
                <TopVideos imags={imageUrls} show={downloadType === 'video'} />
            </motion.div>
        </>
    );
}


const netflixSan = localFont({
    src: "../fonts/NetflixSansBold.otf",
    variable: "--font-netflix-san",
    weight: "100 900",
});

interface Position {
    x: number;
    y: number;
    text: string;
    imgSrc: string;
}

// Positions for images and numbers
const positions: Position[] = [
    { x: 110, y: 200, text: "1", imgSrc: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127720-ADJgIrUVMdU9.jpg" },
    { x: 445, y: 200, text: "2", imgSrc: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127720-ADJgIrUVMdU9.jpg" },
    { x: 780, y: 200, text: "3", imgSrc: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127720-ADJgIrUVMdU9.jpg" },
    { x: 285, y: 563, text: "4", imgSrc: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127720-ADJgIrUVMdU9.jpg" },
    { x: 620, y: 563, text: "5", imgSrc: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127720-ADJgIrUVMdU9.jpg" },
    { x: 110, y: 925, text: "6", imgSrc: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127720-ADJgIrUVMdU9.jpg" },
    { x: 445, y: 925, text: "7", imgSrc: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127720-ADJgIrUVMdU9.jpg" },
    { x: 780, y: 925, text: "8", imgSrc: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127720-ADJgIrUVMdU9.jpg" },
    { x: 240, y: 1285, text: "9", imgSrc: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127720-ADJgIrUVMdU9.jpg" },
    { x: 620, y: 1285, text: "10", imgSrc: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127720-ADJgIrUVMdU9.jpg" },
];

function TopImages({ imags, show }: { imags: string[], show: boolean }) {

    const canvasDetails = [
        {
            bg: '#fff429',
            txtCol: '#2600fe',
            botTxtCol: '#fe00b0'
        },
        {
            bg: '#2600fe',
            txtCol: '#fff429',
            botTxtCol: 'white'
        },
        {
            bg: '#fe00b0',
            txtCol: '#fff429',
            botTxtCol: 'white'
        },
    ]
    const [imageIndex, setImageIndex] = useState(1);

    const [downloadImgUrl, setDownloadImgUrl] = useState('');

    const canvasRef0 = useRef<HTMLCanvasElement>(null);
    const canvasRef1 = useRef<HTMLCanvasElement>(null);
    const canvasRef2 = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (imags.length > 0) {
            positions.map((p, i) => {
                p.imgSrc = imags[i];
            });
        }

        // A counter to track loaded images
        let loadedImages = 0;
        const totalImages = positions.length * canvasDetails.length;

        canvasDetails.map((d, i) => {
            const canvasRef = i === 0 ? canvasRef0 : i === 1 ? canvasRef1 : canvasRef2;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Set canvas dimensions
            const canvasWidth = 1080;
            const canvasHeight = 1920;

            // Resize canvas
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // Background color
            ctx.fillStyle = d.bg;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // Draw background text
            ctx.font = `200px ${netflixSan.style.fontFamily}`;
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
            ctx.textAlign = "center";
            ctx.letterSpacing = "-0.05rem";
            ctx.save();
            ctx.translate(canvasWidth / 2, canvasHeight / 2);
            for (let i = -6; i <= 8; i++) {
                ctx.fillText(i % 2 ? "MY TOP ANIMES." : "P ANIMES. MY TO", 0, i * 150);
            }
            ctx.restore();

            // Draw images and numbers
            positions.forEach((pos) => {
                // Draw number
                ctx.font = `280px ${netflixSan.style.fontFamily}`;
                ctx.fillStyle = d.txtCol;
                ctx.textAlign = "center";
                ctx.letterSpacing = "-0.15rem";
                ctx.fillText(pos.text, pos.x - 40, pos.y + 265);

                // Draw images
                const img = new Image();
                img.src = `${pos.imgSrc}?crossorigin`;
                img.setAttribute("crossOrigin", "anonymous");

                img.onload = () => {
                    const cornerRadius = 16; // Adjust this value for rounded corners
                    const width = 235; // Image width
                    const height = 350; // Image height

                    // Draw the image with rounded corners
                    ctx.save(); // Save the current canvas state

                    // Create a rounded rectangle path
                    ctx.beginPath();
                    ctx.moveTo(pos.x + cornerRadius, pos.y); // Top-left corner
                    ctx.lineTo(pos.x + width - cornerRadius, pos.y); // Top edge
                    ctx.quadraticCurveTo(pos.x + width, pos.y, pos.x + width, pos.y + cornerRadius); // Top-right corner
                    ctx.lineTo(pos.x + width, pos.y + height - cornerRadius); // Right edge
                    ctx.quadraticCurveTo(pos.x + width, pos.y + height, pos.x + width - cornerRadius, pos.y + height); // Bottom-right corner
                    ctx.lineTo(pos.x + cornerRadius, pos.y + height); // Bottom edge
                    ctx.quadraticCurveTo(pos.x, pos.y + height, pos.x, pos.y + height - cornerRadius); // Bottom-left corner
                    ctx.lineTo(pos.x, pos.y + cornerRadius); // Left edge
                    ctx.quadraticCurveTo(pos.x, pos.y, pos.x + cornerRadius, pos.y); // Top-left corner
                    ctx.closePath();

                    ctx.clip(); // Clip the drawing area to the rounded rectangle

                    // Draw the image inside the rounded rectangle
                    ctx.drawImage(img, pos.x, pos.y, width, height);

                    ctx.restore(); // Restore the canvas state

                    // Increment loadedImages and check if all images are loaded
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        // Set download URL when all images are loaded
                        if (canvasRef1.current) {
                            setDownloadImgUrl(canvasRef1.current.toDataURL("image/png"));
                        }
                    }
                };
            });

            // Footer text
            ctx.font = `50px ${netflixSan.style.fontFamily}`;
            ctx.fillStyle = d.botTxtCol;
            ctx.textAlign = "center";
            ctx.letterSpacing = "1rem";
            ctx.fillText("EXAMPLE.COM", canvasWidth / 2, canvasHeight - 50);
        });
    }, []);


    function imageClick(idx: number) {
        setImageIndex(idx)

        if (idx === 2 && canvasRef2.current) {
            setDownloadImgUrl(canvasRef2.current?.toDataURL("image/png"))
        }
        else if (idx === 1 && canvasRef1.current) {
            setDownloadImgUrl(canvasRef1.current?.toDataURL("image/png"))
        }
        else if (idx === 0 && canvasRef0.current) {
            setDownloadImgUrl(canvasRef0.current?.toDataURL("image/png"))
        }
    }

    return (
        <motion.div
            animate={{
                y: show ? '0' : '100vh',
                opacity: show ? 1 : 0,
            }}
            transition={{
                ease: 'easeInOut',
                duration: .5,
            }}
            className=" w-screen h-screen fixed pointer-events-none bg-[#fff429] flex justify-center items-center flex-col text-center">
            <div className="w-full overflow-x-auto grid place-content-center pointer-events-auto relative no-scrollbar">
                <div className="w-fit px-4 flex justify-center items-center overflow-auto no-scrollbar relative">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            initial={{
                                scale: 1,
                            }}
                            animate={{
                                scale: imageIndex === index ? 1 : 0.9,
                            }}
                            transition={{
                                ease: 'easeInOut',
                                duration: 0.5,
                            }}
                            className={`rounded-xl bg-[#2600fe] aspect-[9/16] w-[28.125vh] h-[50vh] relative border ${imageIndex === index ? "border-[#fe00b0]" : ""
                                } overflow-hidden`}
                        >

                            <canvas ref={index === 0 ? canvasRef0 : index === 1 ? canvasRef1 : canvasRef2} className="w-full h-full object-cover" />
                            {imageIndex === index && (
                                <motion.div
                                    initial={{
                                        scale: 0,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                    }}
                                    transition={{
                                        ease: 'easeInOut',
                                        duration: 0.2,
                                    }}
                                    className="absolute bottom-4 right-4 overflow-hidden rounded-full w-6 h-6"
                                >
                                    <img
                                        src="/check.svg"
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            )}
                            <button
                                onClick={() => imageClick(index)}
                                className="w-full h-full absolute top-0 left-0"
                            ></button>
                        </motion.div>
                    ))}
                </div>
            </div>
            <a href={downloadImgUrl} download="mytop10.png" className="bg-[#fe00b0] w-fit rounded-full px-8 py-3 font-extrabold overflow-hidden relative text-xl md:text-2xl text-nowrap text-center mt-6 pointer-events-auto cursor-pointer">Download</a>
        </motion.div>
    )
}

function TopVideos({ imags, show }: { imags: string[], show: boolean }) {

    const [videoUrl, setVideoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{
        const fetchVideo = async () => {
            try {
                // Construct the query string
                let url = '';
                imags.forEach((imgURL, i) => {
                    url += `${i + 1}=${encodeURIComponent(imgURL)}&`;
                });

                // Make a GET request for the video file
                const response = await axios.get(`http://localhost:4000/render?${url}`, {
                    responseType: 'blob', // Important to handle binary data
                });

                // Create a downloadable URL from the response
                const blob = new Blob([response.data], { type: 'video/mp4' });
                const videoDownloadUrl = URL.createObjectURL(blob);
                setVideoUrl(videoDownloadUrl); // Set the URL for download
                setIsLoading(false); // Loading is complete
            } catch (err) {
                console.error(err);
                setErrorMessage('Failed to load video. Please try again.');
                setIsLoading(false); // Loading is complete even in case of error
            }
        };

        fetchVideo();

    },[])

    return (
        <motion.div
            animate={{
                y: show ? '0' : '-100vh',
                opacity: show ? 1 : 0,
            }}
            transition={{
                ease: 'easeInOut',
                duration: .5,
            }}
            className=" w-screen h-screen overflow-hidden p-4 fixed top-0 left-0 pointer-events-none bg-[#fe00b0] flex flex-col gap-2 justify-center items-center">
            <div className=" rounded-xl overflow-hidden bg-[#fff429] aspect-[9/16] w-[28.125vh] h-[50vh] relative grid place-content-center">
                {isLoading ? (
                    <div className="w-20 h-20">
                    <svg viewBox="0 0 24 24">
                        <defs>
                            <filter id="light" y="-50%" x="-50%" width="200%" height="200%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                                <feColorMatrix type="saturate" values="4" />
                                <feComposite in="SourceGraphic" operator="over" />
                            </filter>
                            <radialGradient
                                id="a"
                                cx="0"
                                cy="24"
                                r="24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stop-color="#ff8000" />
                                <stop offset="1" stop-color="#ff8000" stop-opacity="0" />
                            </radialGradient>
                            <radialGradient
                                id="b"
                                cx="24"
                                cy="24"
                                r="24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stop-color="#00ff19" />
                                <stop offset="1" stop-color="#00ff19" stop-opacity="0" />
                            </radialGradient>
                            <radialGradient
                                id="c"
                                cx="12"
                                cy="0"
                                r="12"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stop-color="#9900ff" />
                                <stop offset="1" stop-color="#9900ff" stop-opacity="0" />
                            </radialGradient>
                            <radialGradient
                                id="d"
                                cx="12"
                                cy="12"
                                r="12"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stop-color="#ffff00" />
                                <stop offset="1" stop-color="#ffff00" stop-opacity="0" />
                            </radialGradient>
                            <radialGradient
                                id="e"
                                cx="0"
                                cy="0"
                                r="24"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stop-color="#FF0000" />
                                <stop offset="1" stop-color="#FF0000" stop-opacity="0" />
                            </radialGradient>
                            <radialGradient
                                id="f"
                                cx="24"
                                cy="0"
                                r="20"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stop-color="#0CF" />
                                <stop offset="1" stop-color="#0CF" stop-opacity="0" />
                            </radialGradient>

                            <mask id="circle">
                                <g>
                                    <circle
                                        r="8"
                                        cx="12"
                                        cy="12"
                                        fill="none"
                                        stroke-width="4"
                                        stroke="white"
                                        pathLength="1.025"
                                    ></circle>
                                </g>
                            </mask>
                        </defs>
                        <circle
                            r="8"
                            cx="12"
                            cy="12"
                            fill="none"
                            stroke-width="4"
                            stroke="hsl(0 0% 100% / 0.25)"
                        ></circle>
                        <g>
                            <g mask="url(#circle)">
                                <rect fill="url(#a)" width="24" height="24" />
                                <rect fill="url(#b)" width="24" height="24" />
                                <rect fill="url(#c)" width="24" height="24" />
                                <rect fill="url(#d)" width="24" height="24" />
                                <rect fill="url(#e)" width="24" height="24" />
                                <rect fill="url(#f)" width="24" height="24" />
                            </g>
                        </g>
                    </svg>
                    </div>

                ) : (
                    <video src={videoUrl} autoPlay muted loop className=" w-full h-full object-cover"></video>
                )}

            </div>
            {
                isLoading?(
                    <span className="bg-[#fff429] text-[#2600fe] w-fit rounded-full px-8 py-3 font-extrabold overflow-hidden relative text-xl md:text-2xl text-nowrap text-center mt-6">Making your video...</span>
                ):(
                    errorMessage === ''?
                    (<a href={videoUrl} download="mytop10.mp4" className="bg-[#fff429] text-[#2600fe] w-fit rounded-full px-8 py-3 font-extrabold overflow-hidden relative text-xl md:text-2xl text-nowrap text-center mt-6 pointer-events-auto cursor-pointer">Download</a>)
                    :
                    (<span className="bg-[#fff429] text-[#fe00b0] w-fit rounded-full px-8 py-3 font-extrabold overflow-hidden relative text-xl md:text-2xl text-nowrap text-center mt-6">{errorMessage}</span>)
                )
            }
           </motion.div>
    )
}


export default page