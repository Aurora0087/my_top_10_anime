'use client'

import localFont from "next/font/local";
import React, { useEffect, useRef } from "react"

const netflixSan = localFont({
    src: "../app/fonts/NetflixSansBold.otf",
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

function CanvasImage({ bg = '#a6120d', txtCol = '#fff429', images = [] }: { bg?: string, txtCol?: string, images?: string[]}) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if (images.length > 0) {
            positions.map((p, i) => {
                p.imgSrc = images[i];
            })
        }

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
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Draw background text
        ctx.font = `200px ${netflixSan.style.fontFamily}`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.textAlign = "center";
        ctx.letterSpacing = '-0.05rem'
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
            ctx.fillStyle = txtCol;
            ctx.textAlign = "center";
            ctx.letterSpacing = '-0.15rem'
            ctx.fillText(pos.text, pos.x - 40, pos.y + 265);

            // Draw images
            const img = new Image();
            img.src = pos.imgSrc;

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
            };

        });

        // Footer text
        ctx.font = `50px ${netflixSan.style.fontFamily}`;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.letterSpacing = '1rem'
        ctx.fillText("EXAMPLE.COM", canvasWidth / 2, canvasHeight - 50);


    }, []);

    return (
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
    )
}

export default CanvasImage