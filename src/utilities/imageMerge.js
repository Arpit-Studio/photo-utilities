import { createImage } from "./createImage";

export default function imageMerge(
  images,
  paper_size = { label: "A4", width: 8.3, height: 11.7 },
) {
  const dpi = 100;
  const padding = 100;
  const gap = 10;
  return new Promise(async (resolve, reject) => {
    const canvasArr = [];
    function createCanvas() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const canvasWidth = paper_size.width * dpi;
      const canvasHeight = paper_size.height * dpi;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.fillStyle = "#ffffff"; // White color
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      return [canvas, ctx];
    }
    function pushCanvasToArr(canvas) {
      return new Promise(function (resolve, reject) {
        canvas.toBlob(
          function (blob) {
            var URLObj = window.URL || window.webkitURL;
            const blobUrl = URLObj.createObjectURL(blob);
            canvasArr.push(blobUrl);
            resolve();
          },
          "image/jpeg",
          1,
        );
      });
    }
    function feedNewPage(canvas, ctx) {
      return new Promise(function (resolve, reject) {
        pushCanvasToArr(canvas).then(() => {
          [canvas, ctx] = createCanvas();
          resolve();
        });
      });
    }
    function recalculateImageDimension(img) {
      let imgWidth = img.width;
      let imgHeight = img.height;
      if (img.width > canvas.width - padding * 2) {
        const ratio = img.height / img.width;
        imgWidth = canvas.width - padding * 2;
        imgHeight = ratio * imgWidth;
      }
      return [imgWidth, imgHeight];
    }

    let canvas = null,
      ctx;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (canvas === null) {
        [canvas, ctx] = createCanvas();
      }
      const img = await createImage(image.url);
      const [imgWidth, imgHeight] = recalculateImageDimension(img);
      const x = (canvas.width - imgWidth) / 2;
      const y =
        i % 2 === 0
          ? canvas.height / 2 - imgHeight - gap / 2
          : canvas.height / 2 + gap;
      ctx.drawImage(img, x, y, imgWidth, imgHeight);
      if (i % 2 === 1) {
        await feedNewPage(canvas, ctx);
        canvas = null;
      }
    }
    if (canvas !== null) {
      await pushCanvasToArr(canvas);
    }
    resolve(canvasArr);
  });
}
