export async function pp12_merger(source) {
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
      const acceptedRatios = [45 / 40, 5 / 4];
      const gutter = 40;
      const padding = 80;
      const image = new Image();
      image.src = source;
      image.onload = function () {
        const ratio = image.height / image.width;
        const imageWidth = (canvasWidth - (padding ) - gutter * 4) / 3;
        const imageHeight = (canvasHeight - (padding ) - gutter * 5) / 4;
        if (acceptedRatios.includes(ratio) === false) {
          return reject(
            "Invalid Image dimension ratio. Image must be of aspect ratio 40x45 (1.125)",
          );
        }
        for (let i = 0; i < 12; i++) {
          const row = Math.floor(i / 3);
          const col = i % 3;
          const x = col * imageWidth + col * gutter + padding;
          const y = row * imageHeight + row * gutter + padding;
          ctx.drawImage(image, x, y, imageWidth, imageHeight);
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, imageWidth, imageHeight);
        }
        canvas.toBlob(function(blob) {
            var URLObj = window.URL || window.webkitURL;
            const blobUrl = URLObj.createObjectURL(blob);
            return resolve(blobUrl);
        }, 'image/jpeg'); 
      };
      image.onerror = () => {
        return reject("Something went wrong");
      };
    } catch (e) {
      return reject("Something went wrong");
    }
  });
}
