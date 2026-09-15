# quantum-datetime

Dates and times for Quantum. Timestamps are Unix epoch seconds in UTC, the same numbers `time()` returns.

```python
# @use quantum-datetime

let t = DateTime.parse("2024-03-05T14:30:00Z")
print(DateTime.format(t, "dddd, MMMM D YYYY h:mm A"))   # Tuesday, March 5 2024 2:30 PM
print(DateTime.toISO(DateTime.addMonths(t, 1)))         # 2024-04-05T14:30:00Z
print(DateTime.diff(t, DateTime.now(), "days"))
print(DateTime.relative(t))                              # e.g. "3 years ago"
print(DateTime.formatDuration(3725))                     # 1h 2m 5s
```

Global: `DateTime`.

## API

**Calendar:** `now()` · `isLeapYear(y)` · `daysInMonth(y, m)` · `fromParts(y, m, d, h, mi, s)` (values roll over) · `toParts(t)` → `{"year", "month", "day", "hour", "minute", "second", "weekday" (0 = Sunday), "dayOfYear"}` · `toLocal(t, offsetMinutes)`

**Parsing:** `parse(text)` accepts `YYYY-MM-DD`, `YYYY-MM-DD HH:MM[:SS]` and `YYYY-MM-DDTHH:MM[:SS][.fff][Z|±HH:MM]`; returns `null` for invalid input (including impossible dates like Feb 30).

**Formatting:** `format(t, pattern)` · `toISO(t)`

| Token | Output | Token | Output |
|---|---|---|---|
| `YYYY` `YY` | 2024, 24 | `HH` `H` | 14 (24h) |
| `MMMM` `MMM` | March, Mar | `hh` `h` | 02, 2 (12h) |
| `MM` `M` | 03, 3 | `mm` `m` | minutes |
| `DD` `D` | 05, 5 | `ss` `s` | seconds |
| `dddd` `ddd` | Tuesday, Tue | `A` `a` | PM, pm |

Wrap literal text in brackets: `"[Due] MMM D"`.

**Arithmetic:** `addSeconds` · `addMinutes` · `addHours` · `addDays` · `addWeeks` · `addMonths` (clamps Jan 31 → Feb 29) · `addYears` · `diff(a, b, unit)` (seconds, minutes, hours, days, weeks, months, years) · `age(birth, now)`

**Boundaries:** `startOfDay` · `endOfDay` · `startOfMonth` · `endOfMonth` · `startOfWeek(t, firstDay = 1 Monday)` · `isWeekend` · `isSameDay(a, b)`

**Human output:** `relative(t, now)` ("just now", "5 minutes ago", "in 3 days") · `formatDuration(seconds)` ("1d 1h 1m 1s") · `formatClock(seconds)` ("01:02:05")

## Test

```bat
qpm run test
```
