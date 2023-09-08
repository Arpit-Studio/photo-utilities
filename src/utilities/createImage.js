export const createImage = (url) => new Promise((resolve, reject) => {
  try {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
    //image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  } catch (e) {
    reject(e);
  }
});
