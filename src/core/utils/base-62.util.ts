export const Base62 = (() => {
  const charset =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const base = charset.length;

  return {
    encode(str: string): string {
      // Convert string to a big integer representation
      const num = [...str].reduce((acc, char) => {
        return acc * 256 + char.codePointAt(0); // Use 256 to account for all ASCII characters
      }, 0);

      // Encode the number to Base62
      if (num === 0) return charset[0];
      let encoded = '';
      let tempNum = num;
      while (tempNum > 0) {
        encoded = charset[tempNum % base] + encoded;
        tempNum = Math.floor(tempNum / base);
      }
      return encoded;
    },

    decode(encodedStr) {
      // Decode the Base62 string into a big integer
      const num = [...encodedStr].reduce((acc, char) => {
        return acc * base + charset.indexOf(char);
      }, 0);

      // Convert the big integer back into a string
      const chars = [];
      let tempNum = num;
      while (tempNum > 0) {
        chars.unshift(String.fromCodePoint(tempNum % 256));
        tempNum = Math.floor(tempNum / 256);
      }
      return chars.join('');
    },
  };
})();
