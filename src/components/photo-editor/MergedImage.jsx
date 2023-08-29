import { useCallback, useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import Cropper from "react-easy-crop";
import getCroppedImg, { merge, photo_sizes } from "../../utilities/photo";

export default function MergedImage({ image }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [hasBorder, setBorder] = useState(true);
  const [borderColor, setBorderColor] = useState("#E7E7E7");
  const [photoSize, setPhotoSize] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const changePhotoSize = useCallback((e) => {
    setPhotoSize(e.target.value);
  }, []);

  useEffect(() => {
    try {
      if (!croppedAreaPixels) {
        return;
      }
      getCroppedImg(image, croppedAreaPixels)
        .then((img) => {
          merge(img, photo_sizes[photoSize], hasBorder, borderColor)
            .then((mergedImage) => {
              setCroppedImage(mergedImage);
            })
            .catch((e) => {});
        })
        .catch((e) => {});
    } catch (e) {}
  }, [image, croppedAreaPixels, hasBorder, borderColor]);
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-4 flex flex-col gap-3">
        <div className="relative w-full  aspect-square mx-auto">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={
              photo_sizes[photoSize].width / photo_sizes[photoSize].height
            }
            zoomSpeed={0.01}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="relative w-[300px] mx-auto flex flex-col gap-3">
          <div className="">
            <input
              id="default-range"
              type="range"
              value={zoom}
              step="0.05"
              min="1"
              max="3"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-5 items-center justify-center">
            <div className="col-span-1">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={changePhotoSize}>
                {photo_sizes.map((size, index) => (
                  <option value={index} key={index}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  checked={hasBorder}
                  className="sr-only peer"
                  onChange={(e) => {
                    setBorder(e.target.checked);
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Put Border
                </span>
              </label>
            </div>
            {hasBorder === true ? (
              <div className="col-span-2 flex justify-center">
                <SketchPicker
                  disableAlpha={true}
                  color={borderColor}
                  onChange={(color) => setBorderColor(color.hex)}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="col-span-8">
        {croppedImage ? (
          <div className="">
            <img
              src={croppedImage}
              alt="Merged"
              className={`w-full aspect-square object-contain object-left-top`}
            />
          </div>
        ) : null}{" "}
      </div>
    </div>
  );
}
