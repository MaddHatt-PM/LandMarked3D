const generateUUID = (): string => {
  let uuid = "";
  const uuidLength = 36;
  const hexDigits = "0123456789abcdef";

  for (let i = 0; i < uuidLength; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += "-";
    } else if (i === 14) {
      uuid += "4";
    } else {
      const randomDigit = Math.floor(Math.random() * 16);
      uuid += hexDigits[randomDigit];
    }
  }

  return uuid;
}

export default generateUUID;