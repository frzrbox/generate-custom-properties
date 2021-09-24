export function parseKeyValuePairs(obj, prevKey = null, value) {
  const allKeys = Object.keys(obj);

  allKeys.map((key) => {
    let propString = key;

    if (prevKey) {
      propString = prevKey + `-${key}`;
    }

    // Return css key:value if last nested level
    if (typeof obj[key] !== "object") {
      value.push(`\--${propString}: ${obj[key]};\n`);

      return value;
    }

    // Invoke to handle nested objects
    parseKeyValuePairs(obj[key], propString, value);
  });
}
