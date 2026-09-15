# quantum-validate

Input validation for Quantum: common formats, password strength and declarative schemas.

```python
# @use quantum-validate

print(Validate.isEmail("ada@example.com"))            # true
print(Validate.isUrl("http://localhost:3000/api"))    # true
print(Validate.passwordStrength("hunter2")["label"])  # very weak

let result = Validate.check(form, {
    "name":  {"type": "string", "required": true, "min": 2},
    "age":   {"type": "integer", "min": 18},
    "email": {"type": "email", "required": true},
    "role":  {"oneOf": ["admin", "user"]},
    "tags":  {"type": "array", "items": {"type": "string"}},
    "code":  {"custom": fn(v) { return v.startsWith("Q") ? true : "must start with Q" }}
})
if not result["valid"] {
    for e in result["errors"] { print(e["field"], "->", e["message"]) }
}
```

Global: `Validate`.

## Checks

**Strings:** `isAlpha` · `isDigits` · `isAlphanumeric` · `isHex` · `isNumeric` ("-3.5") · `isIntegerString` · `lengthBetween(s, lo, hi)` · `inRange(n, lo, hi)` · `isUsername(s, min, max)`

**Internet:** `isEmail` · `isDomain` · `isUrl(s, schemes)` (default http/https) · `isIPv4` · `isIPv6` · `isPort` · `isHexColor` · `isUUID`

**Ids & dates:** `isPhone` (7-15 digits, `+ - ( ) .` and spaces allowed) · `isCreditCard` (Luhn) · `isDate` ("YYYY-MM-DD", real calendar days) · `isIntegerNumber`

**Passwords:** `passwordStrength(pw)` → `{"score": 0-4, "label", "suggestions"}` · `isStrongPassword(pw, minScore = 3)`

## Schema rules

`Validate.check(data, schema)` → `{"valid", "errors": [{"field", "message"}]}`

| Rule | Meaning |
|---|---|
| `type` | `string` `number` `integer` `boolean` `array` `dict` `email` `url` `uuid` `date` `phone` `ipv4` |
| `required` | missing or `null` is an error (otherwise missing fields are skipped) |
| `min` / `max` | length for strings and arrays, value for numbers |
| `oneOf` | list of allowed values |
| `schema` | nested rules for a dict field (errors use `parent.child` paths) |
| `items` | rule applied to each array element (`tags[1]`) |
| `custom` | `fn(value)` returning `true`, or an error message |
| `message` | replaces the generated messages for that field |

## Test

```bat
qpm run test
```
