



export function extractImageUrls(url: string): string[] {
    const queryString = url.split('?')[1]; // Get the query string after the "?"
    const params = new URLSearchParams(queryString); // Parse the query string
    const imageUrls: string[] = [];

    Array.from(params.entries()).forEach(([key, value]) => {
        if (!isNaN(Number(key))) { // Ensure the key is a number
            imageUrls.push(value); // Add the image URL to the array
        }
    });

    return imageUrls;
}