import { createImage } from "./createImage";
import { defaultBorder, mm2pixels } from "./photo";


export async function merge(
  source,
  photo_size,
  hasBorder = true,
  borderColor = defaultBorder
) {
  const dpi = 300;
  return new Promise(async function (resolve, reject) {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const canvasWidth = photo_size.canvas.width * dpi;
      const canvasHeight = photo_size.canvas.height * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.fillStyle = "#ffffff"; // White color
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      const image = await createImage(source);
      const imageWidth = mm2pixels(photo_size.width, dpi);
      const imageHeight = mm2pixels(photo_size.height, dpi);
      for (let i = 0; i < photo_size.rows * photo_size.cols; i++) {
        const row = Math.floor(i / photo_size.cols);
        const col = i % photo_size.cols;
        const x = col * imageWidth + col * photo_size.gutter + photo_size.padding.left;
        const y = row * imageHeight + row * photo_size.gutter + photo_size.padding.top;
        ctx.drawImage(image, x, y, imageWidth, imageHeight);
        if (hasBorder) {
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, imageWidth, imageHeight);
        }
      }
      canvas.toBlob(
        function (blob) {
          var URLObj = window.URL || window.webkitURL;
          const blobUrl = URLObj.createObjectURL(blob);
          return resolve(blobUrl);
        },
        "image/png",
        1
      );
    } catch (e) {
      return reject(e);
    }
  });
}
