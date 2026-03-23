import React from "react";
import { Options } from "./types";

export type QRCodeStylingNativeProps = {
  options: Partial<Options>;
  onReady?: (helpers: { toDataURL: () => Promise<string> }) => void;
};

export declare function QRCodeStylingNative(props: QRCodeStylingNativeProps): React.ReactElement | null;
export default QRCodeStylingNative;

export { exportToBase64 } from "./renderers/react-native/rnExport";
export { rnImageLoader } from "./renderers/react-native/rnImageLoader";

export * from "./types";
export * from "./types/svg-descriptors";

export { default as dotTypes } from "./constants/dotTypes";
export { default as cornerDotTypes } from "./constants/cornerDotTypes";
export { default as cornerSquareTypes } from "./constants/cornerSquareTypes";
export { default as errorCorrectionLevels } from "./constants/errorCorrectionLevels";
export { default as errorCorrectionPercents } from "./constants/errorCorrectionPercents";
export { default as modes } from "./constants/modes";
export { default as qrTypes } from "./constants/qrTypes";
export { default as drawTypes } from "./constants/drawTypes";
export { default as shapeTypes } from "./constants/shapeTypes";
export { default as gradientTypes } from "./constants/gradientTypes";
