'use client'

import PageAnimation1 from "@/components/PageAnimation1";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react";

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

    return (
        <PageAnimation1/>
    );
}

export default page