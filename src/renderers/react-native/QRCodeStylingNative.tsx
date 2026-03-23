import React, { useEffect, useState, useRef, useCallback } from "react";
import Svg from "react-native-svg";
import QRSVG from "../../core/QRSVG";
import defaultOptions, { RequiredOptions } from "../../core/QROptions";
import sanitizeOptions from "../../tools/sanitizeOptions";
import mergeDeep from "../../tools/merge";
import getMode from "../../tools/getMode";
import { Options } from "../../types";
import { SvgElementDescriptor } from "../../types/svg-descriptors";
import { rnImageLoader } from "./rnImageLoader";
import { renderToReactNativeSvg } from "./rnRenderer";
import { exportToBase64 } from "./rnExport";
import qrcode from "qrcode-generator";

export type QRCodeStylingNativeProps = {
  /** QR code options — same as the web library (minus nodeCanvas/jsdom) */
  options: Partial<Options>;
  /** Called with export helpers once the SVG is rendered */
  onReady?: (helpers: { toDataURL: () => Promise<string> }) => void;
};

export function QRCodeStylingNative({ options, onReady }: QRCodeStylingNativeProps): React.ReactElement | null {
  const [descriptor, setDescriptor] = useState<SvgElementDescriptor | null>(null);
  const svgRef = useRef<Svg>(null);

  const stableOptions = JSON.stringify(options);

  useEffect(() => {
    const parsed: Partial<Options> = JSON.parse(stableOptions);
    const mergedOptions = sanitizeOptions(mergeDeep(defaultOptions, parsed) as RequiredOptions);

    if (!mergedOptions.data) {
      setDescriptor(null);
      return;
    }

    const qr = qrcode(mergedOptions.qrOptions.typeNumber, mergedOptions.qrOptions.errorCorrectionLevel);
    qr.addData(mergedOptions.data, mergedOptions.qrOptions.mode || getMode(mergedOptions.data));
    qr.make();

    const builder = new QRSVG(mergedOptions);
    const imageLoader = mergedOptions.image ? rnImageLoader : undefined;

    builder.drawQR(qr, imageLoader).then(() => {
      setDescriptor(builder.getDescriptor());
    }).catch((err) => {
      console.warn("QRCodeStylingNative: image failed to load, rendering without image.", err);
      // Retry without image
      const fallbackBuilder = new QRSVG({ ...mergedOptions, image: undefined });
      fallbackBuilder.drawQR(qr).then(() => {
        setDescriptor(fallbackBuilder.getDescriptor());
      });
    });
  }, [stableOptions]);

  const handleReady = useCallback(() => {
    if (onReady && svgRef.current) {
      onReady({
        toDataURL: () => exportToBase64(svgRef)
      });
    }
  }, [onReady]);

  useEffect(() => {
    if (descriptor) {
      // Small delay to ensure SVG ref is mounted
      const timer = setTimeout(handleReady, 50);
      return () => clearTimeout(timer);
    }
  }, [descriptor, handleReady]);

  if (!descriptor) return null;

  return renderToReactNativeSvg(descriptor, svgRef);
}
