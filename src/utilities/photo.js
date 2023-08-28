export async function merge(source) {
  return new Promise(function (resolve, reject) {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const canvasWidth = 1200;
      const canvasHeight = 1800;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const borderColor = "#d3d3d3"; // Light gray color
      ctx.fillStyle = "#ffffff"; // White color
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      const gutter = 30;
      const padding = 60;
      const image = new Image();
      image.src = source;
      image.onload = function () {
        const ratio = image.height / image.width;
        const imageWidth = ((canvasWidth- padding- (gutter  * 4)) / 3);
        const imageHeight = ratio*imageWidth;
        
        for (let i = 0; i < 12; i++) {
          const row = Math.floor(i / 3);
          const col = i % 3;
          const x = col * imageWidth + (col * gutter) + padding;
          const y = row * imageHeight + (row * gutter) + padding;
          ctx.drawImage(image, x, y, imageWidth, imageHeight);
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, imageWidth, imageHeight);
        }
        canvas.toBlob(function (blob) {
          var URLObj = window.URL || window.webkitURL;
          const blobUrl = URLObj.createObjectURL(blob);
          return resolve(blobUrl);
        }, "image/jpeg");
      };
      image.onerror = () => {
        return reject("Something went wrong");
      };
    } catch (e) {
      return reject("Something went wrong");
    }
  });
}
export const createImage = (url) =>
  new Promise((resolve, reject) => {
    try{
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
    }catch(e){
        reject(e);
    }
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false },
) {
    console.log(pixelCrop)
  return new Promise(async (resolve, reject) => {
    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return reject(null);
      }

      const rotRad = getRadianAngle(rotation);

      // calculate bounding box of the rotated image
      const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        image.width,
        image.height,
        rotation,
      );

      // set canvas size to match the bounding box
      canvas.width = bBoxWidth;
      canvas.height = bBoxHeight;

      // translate canvas context to a central location to allow rotating and flipping around the center
      ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
      ctx.rotate(rotRad);
      ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
      ctx.translate(-image.width / 2, -image.height / 2);

      // draw rotated image
      ctx.drawImage(image, 0, 0);

      const croppedCanvas = document.createElement("canvas");

      const croppedCtx = croppedCanvas.getContext("2d");

      if (!croppedCtx) {
        return reject(null);
      }

      // Set the size of the cropped canvas
      croppedCanvas.width = pixelCrop.width;
      croppedCanvas.height = pixelCrop.height;

      // Draw the cropped image onto the new canvas
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
