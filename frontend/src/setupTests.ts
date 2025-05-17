// Import Jest DOM matchers
import '@testing-library/jest-dom';

// Add TextEncoder/TextDecoder polyfill for jsdom environment
class TextEncoderPolyfill {
  encode(input: string): Uint8Array {
    const utf8 = unescape(encodeURIComponent(input));
    const result = new Uint8Array(utf8.length);
    for (let i = 0; i < utf8.length; i++) {
      result[i] = utf8.charCodeAt(i);
    }
    return result;
  }
}

class TextDecoderPolyfill {
  decode(input?: Uint8Array): string {
    if (!input) return '';
    const bytes = Array.from(input);
    const chars = bytes.map(byte => String.fromCharCode(byte));
    return decodeURIComponent(escape(chars.join('')));
  }
}

global.TextEncoder = TextEncoderPolyfill as unknown as typeof TextEncoder;
global.TextDecoder = TextDecoderPolyfill as unknown as typeof TextDecoder;

// Mock the i18next library
jest.mock('react-i18next', () => ({
  // Mock useTranslation hook
  useTranslation: () => {
    return {
      t: (key: string) => key,
      i18n: {
        changeLanguage: jest.fn(),
      },
    };
  },
  // Mock Trans component
  Trans: ({ children }: { children: React.ReactNode }) => children,
}));

console.error = jest.fn(); 