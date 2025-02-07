export const Base62 = (() => {
  const BASE62_CHARSET =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  return {
    encode(str: string): string {
      let num = BigInt(0);

      // Convert each character to its UTF-8 byte value and form a large number
      for (let i = 0; i < str.length; i++) {
        num = (num << BigInt(8)) + BigInt(str.codePointAt(i));
      }

      let encoded = '';
      while (num > 0) {
        encoded = BASE62_CHARSET[Number(num % BigInt(62))] + encoded;
        num = num / BigInt(62);
      }

      return encoded || '0'; // Return "0" for empty input
    },
  };
})();
