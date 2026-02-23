export const getPixelColor = (img : HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;

    context?.drawImage(img, 0, 0);

    const pixelData = context?.getImageData(10, 10, 1, 1).data;

    const red = pixelData && pixelData[0];
    const green = pixelData && pixelData[1];
    const blue = pixelData && pixelData[2];
    const alpha = pixelData && pixelData[3];

    return {red, green, blue, alpha}
}