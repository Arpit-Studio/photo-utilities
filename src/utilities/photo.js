export const photo_sizes = [
  {
    label: "32x40 (12p)",
    width: 28,
    height: 1.25 * 28,
    gutter: 25,
    padding: {
      top: 40,
      left: 80,
    },
    rows: 4,
    cols: 3,
    landscape: false,
    canvas: { width: 4, height: 6 },
  },
  {
    label: "35x45 (8p)",
    width: 35,
    height: 45,
    rows: 2,
    cols: 4,
    gutter: 20,
    padding: {
      top: 50,
      left: 40,
    },
    landscape: true,
    canvas: { width: 6, height: 4 },
  },
  {
    label: "50x50 (2p)",
    width: 50,
    height: 50,
    rows: 2,
    cols: 1,
    gutter: 100,
    padding: {
      top: 100,
      left: 100,
    },
    landscape: true,
    canvas: { width: 4, height: 6 },
  },
];
export function mm2pixels(mm = 1, dpi = 300) {
  return (mm / 25.4) * dpi;
}

export async function merge(
  source,
  photo_size,
  hasBorder = true,
  borderColor = "#d3d3d3",
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
        const x =
          col * imageWidth + col * photo_size.gutter + photo_size.padding.left;
        const y =
          row * imageHeight + row * photo_size.gutter + photo_size.padding.top;
        ctx.drawImage(image, x, y, imageWidth, imageHeight);
        if (hasBorder) {
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, imageWidth, imageHeight);
        }
      }
      canvas.toBlob(function (blob) {
        var URLObj = window.URL || window.webkitURL;
        const blobUrl = URLObj.createObjectURL(blob);
        return resolve(blobUrl);
      }, "image/jpeg");
    } catch (e) {
      return reject(e);
    }
  });
}
export const createImage = (url) =>
  new Promise((resolve, reject) => {
    try {
      const image = new Image();
      image.onload= ()=>resolve(image);
      image.onerror=(err)=>reject(err)
      //image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    } catch (e) {
      reject(e);
    }
  });

export default function getCroppedImg(imageSrc, pixelCrop) {
  return new Promise(async (resolve, reject) => {
    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return reject(null);
      }
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const croppedCanvas = document.createElement("canvas");
      const croppedCtx = croppedCanvas.getContext("2d");
      if (!croppedCtx) {
        return reject(null);
      }
      
      croppedCanvas.width = pixelCrop.width;
      croppedCanvas.height = pixelCrop.height;
      croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );
      croppedCanvas.toBlob((file) => {
        file && resolve((window.URL || window.webkitURL).createObjectURL(file));
      }, "image/jpeg");
    } catch (e) {
      reject(e);
    }
  });
}

export function makePrintable(img){

}
