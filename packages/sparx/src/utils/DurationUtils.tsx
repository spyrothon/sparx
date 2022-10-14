// Converts from seconds to 00:00:00
export function toString(rawSeconds: string | number | undefined, stringifyNull: true): string;
export function toString(
  rawSeconds: string | number | undefined,
  stringifyNull?: false,
): string | undefined;
export function toString(rawSeconds: string | number | undefined, stringifyNull = false) {
  if (rawSeconds == null) return stringifyNull ? "00:00:00" : undefined;
  if (typeof rawSeconds !== "number") {
    rawSeconds = parseInt(rawSeconds);
  }

  if (isNaN(rawSeconds)) return stringifyNull ? "00:00:00" : undefined;

  const isNegative = rawSeconds < 0;
  rawSeconds = Math.abs(rawSeconds);

  const hours = Math.floor(rawSeconds / 3600);
  const minutes = Math.floor(rawSeconds / 60) % 60;
  const seconds = rawSeconds % 60;

  const negativeStr = isNegative ? "-" : "";
  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toFixed(0).padStart(2, "0");

  return `${negativeStr}${hoursStr}:${minutesStr}:${secondsStr}`;
}

// Converts from 00:00:00 to seconds
export function fromString(value: string) {
  const parts = value.split(":");

  switch (parts.length) {
    // When only one part is given, parse it as seconds
    case 1: {
      return parseInt(parts[0]);
    }
    // Two parts are treated as minutes:seconds
    case 2: {
      const [minutesRaw, secondsRaw] = parts;
      const minutes = parseInt(minutesRaw);
      const seconds = parseInt(secondsRaw);
      if (isNaN(minutes) || isNaN(seconds)) return 0;
      return minutes * 60 + seconds;
    }
    // Three parts is the full representation
    case 3: {
      const [hoursRaw, minutesRaw, secondsRaw] = parts;
      const hours = parseInt(hoursRaw);
      const minutes = parseInt(minutesRaw);
      const seconds = parseInt(secondsRaw);
      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return 0;
      return hours * 3600 + minutes * 60 + seconds;
    }
    // Anything else is unmanageable
    default:
      return 0;
  }
}

export default {
  toString,
  fromString,
};
