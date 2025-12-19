# CSS Unit Converter

A dynamic CSS unit converter that converts values between different CSS units with instant feedback and a minimalist UI.

## Features

- **Dynamic Conversion**: Convert between px, rem, em, vw, vh, %, and pt
- **Instant Feedback**: Real-time conversion as you type
- **Configurable Settings**:
  - Root Font Size (for rem calculations)
  - Viewport Width (for vw calculations)
  - Viewport Height (for vh calculations)
  - Parent Font Size (for em and % calculations)
- **All Conversions View**: See your input value converted to all supported units at once
- **Minimalist UI**: Clean, modern interface with gradient design
- **Responsive**: Works on desktop and mobile devices

## Supported Units

- **px** (pixels): Absolute unit
- **rem** (root em): Relative to root font size
- **em**: Relative to parent font size
- **vw** (viewport width): Percentage of viewport width
- **vh** (viewport height): Percentage of viewport height
- **%** (percent): Relative to parent font size
- **pt** (points): Absolute unit (1pt = 4/3px)

## Usage

Simply open `index.html` in your web browser. No build process or dependencies required!

1. Enter a value in the "Value" field
2. Select the unit you're converting from
3. Select the unit you want to convert to
4. See instant results in the result panel and all conversions table

## Configuration

Adjust the settings at the top to match your design requirements:
- **Root Font Size**: Default is 16px (browser default)
- **Viewport Width**: Auto-detected from your browser window
- **Viewport Height**: Auto-detected from your browser window
- **Parent Font Size**: Default is 16px

The converter automatically updates all conversions when you change any setting.

## Screenshots

![CSS Unit Converter](https://github.com/user-attachments/assets/0ce776cb-54e5-4fec-90ea-c35efaf88bc0)

![Dynamic Conversion Example](https://github.com/user-attachments/assets/e6429cc4-3a17-42ca-a9f4-e581bde82546)

## How It Works

The converter uses a two-step conversion process:
1. Convert the input value to pixels (base unit)
2. Convert pixels to the target unit

This ensures accurate conversions between any two units, taking into account the configured root font size, viewport dimensions, and parent font size.

## License

MIT License - See LICENSE file for details
