'use client'

import ValidatePage from "@/components/ValidatePage";
import { Suspense } from "react";


function page() {
    return (
        <Suspense>
            <ValidatePage />
        </Suspense>

    );
}

export default page