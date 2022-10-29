/**
 * Formats `date` to a format that is compatible with `input[type=datetime-local]`.
 * The input type is finicky in only accepting very specifically formatted time
 * strings which don't actually accept a timezone to make them local. So, this
 * function takes care of converting to the proper timezone to ensure that the
 * date that the input shows matches exactly what is supplied.
 *
 * `tzOffset` is expected to be a timezone offset represented in minutes, such as
 * `240` for Eastern Time (US).
 */
export function formatDateTimeLocalToString(date: undefined, tzOffset?: number): undefined;
export function formatDateTimeLocalToString(date: Date, tzOffset?: number): string;
export function formatDateTimeLocalToString(date?: Date, tzOffset?: number): string | undefined;
export function formatDateTimeLocalToString(date?: Date, tzOffset?: number): string | undefined {
  if (date == null) return undefined;

  const offset = tzOffset ?? new Date().getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 16);
}

/**
 * The inverse of `formatDateTimeLocalToString`, this function takes a date
 * string from the value of an `input[type=datetime-local]` and parses it into
 * a `Date` object, with the appropriate timezone translations applied so that
 * the time the user picks in the input visually matches the Date that is returned.
 *
 * Without this, timezone conversions would provide a UTC Date object from a
 * localized date selection, which always ends up appearing incorrect.
 */
export function parseStringToDateTimeLocal(source: string, tzOffset?: number): Date {
  const offset = tzOffset ?? new Date().getTimezoneOffset();
  const date = new Date(source);
  return new Date(date.getTime() + offset * 60000);
}

/**
 * Take the given `date` and strip the timezone information, treating it as
 * a UTC time directly (without adding or subtracting the timezone offset).
 */
export function forceDateAsUTC(date?: Date): Date | undefined {
  if (date == null) return undefined;

  return new Date(date.toISOString().slice(0, 23));
}
