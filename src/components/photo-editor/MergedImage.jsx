import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg, { merge } from "../../utilities/photo";

export default function MergedImage({ image }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [ratio, setRatio] = useState(40 / 45);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    width: 0,
    height: 0,
  });
  const [croppedImage, setCroppedImage] = useState(null);
  useEffect(() => {
    try {
      getCroppedImg(image, croppedAreaPixels, rotation).then((croppedImage) => {
        merge(croppedImage).then((mergedImage) => {
          setCroppedImage(mergedImage);
        });
      });
    } catch (e) {}
    
  }, [image, croppedAreaPixels, rotation]);
  const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-col gap-3"><div className="relative w-[300px] h-[300px] mx-auto">
        <Cropper
          image={image}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={ratio}
          zoomSpeed={0.01}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="relative w-[300px] mx-auto flex flex-col gap-3">
        <div>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              setRatio(e.target.value);
            }}>
            <option value={40 / 45}>40x45</option>
            <option value={35 / 45}>35x45</option>
            <option value={2/2}>2x2</option>
          </select>
        </div>
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
      </div>
      </div>
      {croppedImage ? (
        <div className="flex-1">
          <img src={croppedImage} alt="Merged" className="h-[80vh] w-auto " />
        </div>
      ) : null}
    </div>
  );
}
