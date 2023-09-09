import ArrayToChunks from "./ArrayToChunks";
import { createImage } from "./createImage";

export default function imageMerge(
  images,
  dpi = 150,
  padding = 100,
  gap = 10,
  align = "center",
  per_page = 2,
  paper_size = { label: "A4", width: 8.3, height: 11.7 },
) {
  per_page = Math.max(0, per_page);
  per_page = Math.min(3, per_page);
  const canvasWidth = paper_size.width * dpi;
  const canvasHeight = paper_size.height * dpi;
  return new Promise(async (resolve, reject) => {
    const pageCanvasArr = [];
    const canvasArr = [];
    function createCanvas() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.fillStyle = "#ffffff"; // White color
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      return [canvas, ctx];
    }
    function pushToOutputCanvasArr(canvas, arr) {
      return new Promise(function (resolve, reject) {
        canvas.toBlob(
          function (blob) {
            var URLObj = window.URL || window.webkitURL;
            const blobUrl = URLObj.createObjectURL(blob);
            arr.push(blobUrl);
            resolve();
          },
          "image/jpeg",
          1,
        );
      });
    }
    function recalculateImageDimension(img) {
      let imgWidth = img.width;
      let imgHeight = img.height;
      if (img.width > canvasWidth - padding * 2) {
        const ratio = img.height / img.width;
        imgWidth = canvasWidth - padding * 2;
        imgHeight = ratio * imgWidth;
      }
      return [imgWidth, imgHeight];
    }

    const imagePairs = ArrayToChunks(images, per_page);

    for (let i = 0; i < imagePairs.length; i++) {
      const pair = imagePairs[i];
      let imgs = [];
      let widths = [];
      let heights = [];
      for (let j = 0; j < pair.length; j++) {
        imgs[j] = await createImage(pair[j].url);
        const [w, h] = recalculateImageDimension(imgs[j]);
        widths[j] = w;
        heights[j] = h;
      }
      const maxWidth = Math.max(...widths);
      const totalHeight = parseInt(
        heights.reduce(
          (partialSum, a) => partialSum + a,
          parseInt(gap) * (imgs.length - 1),
        ),
      );
      const tmpCanvas = document.createElement("canvas");
      const tmpCxt = tmpCanvas.getContext("2d");
      tmpCanvas.width = maxWidth;
      tmpCanvas.height = totalHeight;
      tmpCxt.fillStyle = "#ffffff";
      tmpCxt.fillRect(0, 0, maxWidth, totalHeight);
      let y = 0;
      for (let i = 0; i < imgs.length; i++) {
        const x = (maxWidth - widths[i]) / 2;
        tmpCxt.drawImage(imgs[i], x, y, widths[i], heights[i]);
        y = y + parseInt(heights[i]) + parseInt(gap);
      }
      canvasArr.push(tmpCanvas);
    }

    let canvas = null,
      ctx = null;
    for (let i = 0; i < canvasArr.length; i++) {
      [canvas, ctx] = createCanvas();
      const x = (canvas.width - canvasArr[i].width) / 2;
      let y = padding;
      switch (align) {
        default:
          y = padding;
          break;
        case "center":
          y = (canvas.height - canvasArr[i].height) / 2;
          break;
        case "bottom":
          y = canvas.height - padding - canvasArr[i].height;
          break;
      }
      ctx.drawImage(canvasArr[i], x, y);
      await pushToOutputCanvasArr(canvas, pageCanvasArr);
    }
    // for (let i = 0; i < images.length; i++) {
    //   const image = images[i];
    //   if (canvas === null) {
    //     [canvas, ctx] = createCanvas();
    //   }
    //   const img = await createImage(image.url);
    //   const [imgWidth, imgHeight] = recalculateImageDimension(img);
    //   const x = (canvas.width - imgWidth) / 2;
    //   const y =
    //     i % 2 === 0
    //       ? canvas.height / 2 - imgHeight - gap / 2
    //       : canvas.height / 2 + gap / 2;
    //   ctx.drawImage(img, x, y, imgWidth, imgHeight);
    //   if (i % 2 === 1) {
    //     await feedNewPage(canvas, ctx);
    //     canvas = null;
    //   }
    // }
    // if (canvas !== null) {
    //   await pushCanvasToArr(canvas);
    // }
    resolve(pageCanvasArr);
  });
}
