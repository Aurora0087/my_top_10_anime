/*'use client'

import { motion } from "motion/react";
import React from "react";
import { DragEvent, useState } from "react";

interface Card {
  id: number
  coverImage: {
    large: string
  }
}

interface RowProps {
  cards: Card[];
  setCards: (cards:Card[])=>void;
}

interface DropIndicatorProps {
  beforeId: string | null;
}

function DragDropFlex({ cards, setCards }: RowProps) {
  return (
    <Row cards={cards} setCards={setCards} />
  )
}

function Row({ cards, setCards }: RowProps) {


  // pc drag
  function handleDragStart(e: DragEvent<HTMLDivElement>, cardId: string) {
    e.dataTransfer.setData('cardId', cardId)
  }

  function handleDragEnd(e: DragEvent<HTMLDivElement>) {

    const cardId = e.dataTransfer.getData("cardId");
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const beforeId = element.dataset.before || "-1";

    if (beforeId !== cardId) {
      let updatedCards = [...cards];
      const draggedCard = updatedCards.find((c) => String(c.id) === cardId);

      if (!draggedCard) return;

      // Remove the dragged card from its current position
      updatedCards = updatedCards.filter((c) => String(c.id) !== cardId);

      if (beforeId === "-1") {
        // Add the dragged card to the end
        updatedCards.push(draggedCard);
      } else {
        // Insert the card before the target card
        const insertIndex = updatedCards.findIndex((c) => String(c.id) === beforeId);
        updatedCards.splice(insertIndex, 0, draggedCard);
      }

      setCards(updatedCards);
    }
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    highlightIndicator(e);

    const container = e.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();

    const SCROLL_SPEED = 5; // Adjust scrolling speed
    if (e.clientX < rect.left + 50) {
      // Scroll left
      container.scrollBy({ left: -SCROLL_SPEED, behavior: "smooth" });
    } else if (e.clientX > rect.right - 50) {
      // Scroll right
      container.scrollBy({ left: SCROLL_SPEED, behavior: "smooth" });
    }

    if (e.clientY < rect.top + 50) {
      // Scroll up
      container.scrollBy({ top: -SCROLL_SPEED, behavior: "smooth" });
    } else if (e.clientY > rect.bottom - 50) {
      // Scroll down
      container.scrollBy({ top: SCROLL_SPEED, behavior: "smooth" });
    }
  }


  function handleDragLeave() {
    clearHighlights();
  }

  function getIndicators() {
    return Array.from(document.querySelectorAll("[data-row-indicator]")) as HTMLElement[];
  }

  function clearHighlights(indicators?: HTMLElement[]) {
    const els = indicators || getIndicators();
    els.forEach((el) => {
      el.style.opacity = "0";
    });
  }
  function highlightIndicator(e: DragEvent<HTMLDivElement>) {
    const indicators = getIndicators();
    clearHighlights(indicators);

    const { element } = getNearestIndicator(e, indicators);
    element.style.opacity = "1";
  }
  function getNearestIndicator(e: DragEvent<HTMLDivElement>, indicators: HTMLElement[]) {
    const DISTANCE_OFFSET = 20;

    return indicators.reduce(
      (closest, el) => {
        const box = el.getBoundingClientRect();
        const offset = e.clientX - (box.left + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: el };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY, element: indicators[indicators.length - 1] }
    );
  }


  // mobile touchDrag
  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    // Store the dragged card ID in a state or a global variable
    e.currentTarget.dataset.dragging = "true";
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    const touch = e.touches[0];
    const draggedElement = document.querySelector('[data-dragging="true"]') as HTMLElement;

    if (draggedElement) {
      // Move the element with the touch
      draggedElement.style.position = "fixed";
      draggedElement.style.left = `${touch.clientX}px`;
      draggedElement.style.top = `${touch.clientY}px`;
    }
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    const draggedElement = document.querySelector('[data-dragging="true"]');
    if (draggedElement) {
      draggedElement.removeAttribute("data-dragging");
      // Implement logic for dropping the card in the right position
    }
  }


  return (
    <div
      className={`flex w-full overflow-x-auto no-scrollbar gap-2 p-4`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
    >
      {cards.map((card, i) => (
        <div key={card.id} className="flex gap-2 relative ">
          <DropIndicator beforeId={String(card.id)} />
          <div className=" absolute transition-all top-0 left-2 ml-2 p-1 bg-[#fff429] rounded-br-xl text-[#fe00b0] font-extrabold text-4xl md:text-6xl pointer-events-none">
            {i + 1}
          </div>
          <motion.div
            layout
            layoutId={String(card.id)}
            draggable="true"
            onDragStart={(e) => handleDragStart(e as any, String(card.id))}

            onTouchStart={(e) => handleTouchStart(e)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="cursor-grab rounded-xl overflow-hidden h-[42vh] w-[30vh] bg-neutral-800 active:cursor-grabbing flex-grow"
          >
            <img src={card.coverImage.large} alt="" className=" w-full h-full object-cover" />
          </motion.div>
        </div>
      ))}
      <DropIndicator beforeId={null} />
    </div>
  )
}

function DropIndicator({ beforeId }: DropIndicatorProps) {
  return (
    <div
      data-before={beforeId || "-1"}
      data-row-indicator
      className="h-[42vh] w-2 rounded-full bg-[#2600fe] opacity-0 transition-opacity"
    />
  )

}

export default DragDropFlex*/