import { Image } from "react-native";
import { ImageLoader } from "../../types/svg-descriptors";

export const rnImageLoader: ImageLoader = (imageSource: string | number) => {
  return new Promise((resolve, reject) => {
    // Handle RN local assets from require() which return a number
    if (typeof imageSource === "number") {
      const resolved = Image.resolveAssetSource(imageSource);
      if (!resolved) {
        return reject("Could not resolve local image asset");
      }
      resolve({ width: resolved.width, height: resolved.height, dataUri: resolved.uri });
      return;
    }

    // Handle string URIs (remote URLs, data URIs, file paths)
    Image.getSize(
      imageSource,
      (width: number, height: number) => {
        resolve({ width, height, dataUri: imageSource });
      },
      (error: unknown) => {
        reject(error);
      }
    );
  });
};
