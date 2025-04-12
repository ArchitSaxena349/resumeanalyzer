export async function fetchAndExtractText(fileUrl: string) {
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const text = await blob.text();
    return text;
}