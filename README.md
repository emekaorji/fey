# QR Code Styling

JavaScript library for generating styled QR codes with a wide range of customization options. Works in the browser, Node.js, and **React Native**.

## Features

- 6 dot styles: `square`, `dots`, `rounded`, `extra-rounded`, `classy`, `classy-rounded`
- 3 corner square styles: `dot`, `square`, `extra-rounded`
- 2 corner dot styles: `dot`, `square`
- Linear and radial gradients for all elements
- Center image overlay with auto-sizing
- Circle-shaped QR codes
- SVG and Canvas rendering (web)
- React Native support via `react-native-svg`

## Installation

```bash
npm install qr-code-styling
```

### React Native additional dependencies

```bash
npm install react-native-svg
```

## Usage

### Browser / Web

```js
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "https://example.com",
  image: "https://example.com/logo.png",
  dotsOptions: {
    color: "#4267b2",
    type: "rounded"
  },
  cornersSquareOptions: {
    type: "extra-rounded"
  },
  backgroundOptions: {
    color: "#e9ebee"
  }
});

qrCode.append(document.getElementById("canvas"));

// Download as file
qrCode.download({ name: "qr", extension: "svg" });
```

### React

```jsx
import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "https://example.com",
  dotsOptions: {
    color: "#4267b2",
    type: "rounded"
  }
});

function App() {
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  return <div ref={ref} />;
}
```

### React Native

Both named and default imports work:

```tsx
// Named import
import { QRCodeStylingNative } from "qr-code-styling";

// Or default import
import QRCodeStylingNative from "qr-code-styling";
```

```tsx
import { QRCodeStylingNative } from "qr-code-styling";

function App() {
  return (
    <QRCodeStylingNative
      options={{
        width: 300,
        height: 300,
        data: "https://example.com",
        image: "https://example.com/logo.png",
        dotsOptions: {
          color: "#4267b2",
          type: "rounded"
        },
        cornersSquareOptions: {
          type: "extra-rounded"
        },
        cornersDotOptions: {
          type: "dot"
        },
        backgroundOptions: {
          color: "#e9ebee"
        }
      }}
    />
  );
}
```

#### Exporting in React Native

Use the `onReady` callback to get access to export helpers:

```tsx
import { QRCodeStylingNative } from "qr-code-styling";
import { Share } from "react-native";

function App() {
  const handleReady = ({ toDataURL }) => {
    // toDataURL() returns a Promise<string> with a base64 data URI
    toDataURL().then((dataUri) => {
      Share.share({ url: dataUri });
    });
  };

  return (
    <QRCodeStylingNative
      options={{
        width: 300,
        height: 300,
        data: "https://example.com",
        dotsOptions: { type: "dots", color: "#000" }
      }}
      onReady={handleReady}
    />
  );
}
```

#### React Native Props

| Prop | Type | Description |
|------|------|-------------|
| `options` | `Partial<Options>` | QR code configuration (same as web, minus `nodeCanvas`/`jsdom`) |
| `onReady` | `(helpers: { toDataURL: () => Promise<string> }) => void` | Called when SVG is rendered with export helpers |

## Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `number` | `300` | Width of the QR code |
| `height` | `number` | `300` | Height of the QR code |
| `data` | `string` | `""` | The data to encode |
| `image` | `string` | `undefined` | URL of center image |
| `type` | `"canvas" \| "svg"` | `"canvas"` | Render type (web only) |
| `shape` | `"square" \| "circle"` | `"square"` | QR code shape |
| `margin` | `number` | `0` | Margin around the QR code |
| `qrOptions` | `object` | | QR generation options |
| `imageOptions` | `object` | | Center image options |
| `dotsOptions` | `object` | | Dot styling options |
| `cornersSquareOptions` | `object` | | Corner square styling |
| `cornersDotOptions` | `object` | | Corner dot styling |
| `backgroundOptions` | `object` | | Background styling |

### `qrOptions`

| Property | Type | Default |
|----------|------|---------|
| `typeNumber` | `0 - 40` | `0` (auto) |
| `mode` | `"Numeric" \| "Alphanumeric" \| "Byte" \| "Kanji"` | auto |
| `errorCorrectionLevel` | `"L" \| "M" \| "Q" \| "H"` | `"Q"` |

### `dotsOptions`

| Property | Type | Default |
|----------|------|---------|
| `type` | `"square" \| "dots" \| "rounded" \| "extra-rounded" \| "classy" \| "classy-rounded"` | `"square"` |
| `color` | `string` | `"#000"` |
| `gradient` | `Gradient` | `undefined` |
| `roundSize` | `boolean` | `true` |

### `cornersSquareOptions`

| Property | Type | Default |
|----------|------|---------|
| `type` | `"dot" \| "square" \| "extra-rounded"` | `undefined` (follows dot type) |
| `color` | `string` | `undefined` (follows dot color) |
| `gradient` | `Gradient` | `undefined` |

### `cornersDotOptions`

| Property | Type | Default |
|----------|------|---------|
| `type` | `"dot" \| "square"` | `undefined` (follows dot type) |
| `color` | `string` | `undefined` (follows dot color) |
| `gradient` | `Gradient` | `undefined` |

### `imageOptions`

| Property | Type | Default |
|----------|------|---------|
| `hideBackgroundDots` | `boolean` | `true` |
| `imageSize` | `number` | `0.4` |
| `margin` | `number` | `0` |
| `crossOrigin` | `string` | `undefined` |
| `saveAsBlob` | `boolean` | `true` |

### `backgroundOptions`

| Property | Type | Default |
|----------|------|---------|
| `color` | `string` | `"#fff"` |
| `gradient` | `Gradient` | `undefined` |
| `round` | `number` | `0` |

### Gradient

```ts
{
  type: "linear" | "radial",
  rotation: number, // in radians
  colorStops: [
    { offset: 0, color: "#000" },
    { offset: 1, color: "#fff" }
  ]
}
```

## API (Web)

### `append(container: HTMLElement): void`

Appends the QR code to a DOM container.

### `update(options?: Partial<Options>): void`

Updates the QR code with new options.

### `download(options?: { name?: string, extension?: "svg" | "png" | "jpeg" | "webp" }): Promise<void>`

Downloads the QR code as a file.

### `getRawData(extension?: "svg" | "png" | "jpeg" | "webp"): Promise<Blob | Buffer | null>`

Returns the raw QR code data.

### `applyExtension(extension: (svg: SVGElement, options: Options) => void): void`

Applies a custom extension function to the SVG element.

## License

MIT
