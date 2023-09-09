import { useCallback, useEffect, useMemo, useState } from "react";
import { SketchPicker } from "react-color";
import Cropper from "react-easy-crop";
import Loading from "../../../components/Loading";
import getCroppedImg, {
  defaultBorder,
  merge,
  photo_sizes,
} from "../../../utilities/photo";

export default function MergedImage({ image, size }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [hasBorder, setBorder] = useState(true);
  const [borderColor, setBorderColor] = useState(defaultBorder);
  const [loading, setLoading] = useState(true);
  const aspectratio = useMemo(
    () => photo_sizes[size].width / photo_sizes[size].height,
    [size],
  );
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    if (croppedAreaPixels) {
      setLoading(true);
      const timeout = setTimeout(() => {
        getCroppedImg(image, croppedAreaPixels)
          .then((img) => {
            merge(img, photo_sizes[size], hasBorder, borderColor)
              .then((mergedImage) => {
                setCroppedImage(mergedImage);
                setLoading(false);
              })
              .catch((e) => {});
          })
          .catch((e) => {});
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [image, croppedAreaPixels, hasBorder, borderColor, size]);
  return (
    <div className="col-span-12 grid grid-cols-12 gap-5">
      <div className="col-span-4 flex flex-col gap-3">
        <div className="relative w-full  aspect-square mx-auto">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspectratio}
            zoomSpeed={0.01}
            onCropChange={(e) => setCrop(e)}
            onCropComplete={(e, f) => onCropComplete(e, f)}
            onZoomChange={(e) => setZoom(e)}
          />
        </div>
        <div className="relative mx-auto flex flex-col gap-3 w-full">
          <div className="">
            <input
              id="default-range"
              type="range"
              value={zoom}
              step="0.05"
              min="1"
              max="3"
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-1 gap-5 items-center justify-center">
            <div className="col-span-1 flex justify-center">
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
                <div className="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-300">
                  Has Border
                </span>
              </label>
            </div>
            {hasBorder === true ? (
              <div className="col-span-1 flex justify-center">
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
        {loading ? (
          <Loading />
        ) : (
          (croppedImage && (
            <div className="">
              <img
                src={croppedImage}
                alt="Merged"
                className={`w-full aspect-square object-contain object-left-top`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
