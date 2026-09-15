# quantum-events

Event-driven building blocks for Quantum: an event emitter, a Redux-style store and a finite state machine.

```python
# @use quantum-events

let bus = EventEmitter()
let id = bus.on("login", fn(user) { print("welcome", user) })
bus.emit("login", "ada")
bus.off(id)

let store = Store(fn(state, action) {
    if action["type"] == "add" { return {"count": state["count"] + action["by"]} }
    return state
}, {"count": 0})
store.subscribe(fn(state, previous, action) { print(previous["count"], "->", state["count"]) })
store.dispatch({"type": "add", "by": 2})
store.undo()

let order = StateMachine("cart", {
    "cart":    {"checkout": "payment"},
    "payment": {"pay": "paid", "cancel": "cart"},
    "paid":    {}
})
order.onEnter("paid", fn(t) { print("send receipt") })
order.send("checkout")
order.send("pay")
```

Globals: `EventEmitter`, `Store`, `StateMachine`.

Listeners are removed by the **id** returned from `on`/`once`/`subscribe`, because Quantum functions can't be compared with `==`.

## EventEmitter

`on(event, handler)` → id · `once(event, handler)` → id · `off(id)` · `emit(event, payload)` → number of listeners called · `listenerCount(event)` · `eventNames()` · `removeAll(event?)`

Listen on `"*"` to receive every event as `handler(event, payload)`. Listeners may add or remove listeners while an event is being emitted.

## Store

`Store(reducer, initialState, {"historyLimit": 50})`

`getState()` · `dispatch(action)` · `subscribe(fn(state, previous, action))` → id · `unsubscribe(id)` · `undo()` · `watch(selector, fn(value))` (fires only when the selected value changes) · `use(fn(store, action))` middleware: return the action (optionally changed), or `null` to cancel it.

## StateMachine

`StateMachine(initial, {"state": {"event": "nextState"}})`

`send(event)` (raises on invalid transitions) · `trySend(event)` → bool · `can(event)` · `available()` · `matches(state)` · `state` · `onTransition(fn(info))` · `onLeave(state, fn(info))` · `onEnter(state, fn(info))` · `off(id)`. `info` is `{"from", "to", "event"}`; hooks run in the order transition → leave → enter.

## Test

```bat
qpm run test
```
