'use client';

import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { createSwapy } from "swapy";
import PerspectiveText from "./PerspectiveText";

interface Card {
    id: number;
    coverImage: {
        large: string;
    };
}

interface RowProps {
    cards: Card[];
    setCards: (cards: Card[])=>void;
}

function SwapyDragDrop({ cards, setCards }: RowProps) {
    return <Row cards={cards} setCards={setCards} />;
}

function Row({ cards, setCards }: RowProps) {

    const [validateUrl, setValidateUrl] = useState('');
    const [swapCard, setSwapCard] = useState(cards);
    const containerRef = useRef<HTMLDivElement>(null); // Ref for the container

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            console.error("Swapy container not found.");
            return;
        }

        const swapy = createSwapy(container, {
            animation: 'dynamic',
            autoScrollOnDrag: true,
            swapMode: "hover",
        });

        swapy.enable(true);

        swapy.onSwapEnd(({ data }) => {
            const newCards = data.array
                .map((c) => {
                    return cards.find((card) => card.id === Number(c.itemId));
                })
                .filter(Boolean) as Card[];

            // Update the cards state
            setCards(newCards);
            setSwapCard(swapCard)
        });

        if (cards.length === 10) {
            let url = '';

            cards.map((c, i) => {
                url += i + '=' + c.coverImage.large + '&'
            })

            setValidateUrl(url);
        }

        return () => {
            swapy.destroy();
        };
    }, [cards]);

    // Scroll Right Function
    const scrollRight = () => {
        const container = containerRef.current;
        if (container) {
            container.scrollBy({ left: 250, behavior: "smooth" });
        }
    };

    // Scroll Left Function
    const scrollLeft = () => {
        const container = containerRef.current;
        if (container) {
            container.scrollBy({ left: -250, behavior: "smooth" });
        }
    };

    return (
        <div className="relative">
            <div
                ref={containerRef}
                className="swapy-container flex w-full h-fit overflow-x-auto no-scrollbar gap-2 p-4 py-8"
            >
                {swapCard.map((card, i) => (
                    <div
                        key={i}
                        className="h-[45vh] flex items-end w-[30vh] rounded-xl relative"
                    >
                        <div className="z-[99999] absolute top-6 left-0 text-8xl lg:text-[10vw] leading-5 text-[#fe00b0] font-extrabold tracking-tighter text-center">
                            {i+1}
                        </div>
                        <div className="absolute bottom-0 right-1 text-4xl text-[#fff429] font-extrabold tracking-tighter text-center">
                            {i+1}
                        </div>
                        <div
                            data-swapy-slot={String(i)}
                            className="bg-[#2600fe] w-fit h-fit rounded-xl"
                        >
                            <div
                                className="rounded-xl overflow-hidden h-[42vh] w-[30vh]"
                                data-swapy-item={String(card.id)}
                            >
                                <img
                                    src={card.coverImage.large}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full flex items-center justify-center gap-2">
                <div
                    className="w-12 h-12 p-1 z-[9999] rounded-full cursor-pointer rotate-180 pointer-events-auto"
                    onClick={scrollLeft}
                >
                    <img src="/right.svg" alt="" className=" w-full h-full object-fill" />
                </div>
                {
                    cards.length === 10 &&

                    <motion.a
                        animate={{
                            scale: [1, 0.8, 1]
                        }}
                        transition={{
                            repeat: Infinity,
                            ease: 'easeInOut',
                            duration: 2,
                        }}
                        href={`/validate?${validateUrl}`} className=" transition bg-[#2600fe] text-xl md:text-2xl text-nowrap rounded-full py-2 px-8">
                        <PerspectiveText label={"continue"} />
                    </motion.a>
                }
                <div
                    className="w-12 h-12 z-[9999] p-1 rounded-full cursor-pointer pointer-events-auto"
                    onClick={scrollRight}
                >
                    <img src="/right.svg" alt="" className=" w-full h-full object-fill" />
                </div>
            </div>

        </div>
    );
}

export default SwapyDragDrop;
