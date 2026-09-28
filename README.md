# 🗳️ Voting-System

A small, dependency-free polling application implemented in a single JavaScript file (`script.js`). It lets you add poll options, cast votes, and display the results — all backed by a `Map` of `Set`s.

## Overview

The poll is modeled as a `Map` where each **option** (e.g. `"Turkey"`) maps to a `Set` of voter IDs:

- Adding an option registers it with an empty set of voters.
- Casting a vote adds a voter ID to the option's set — duplicate votes by the same voter are rejected.
- Displaying results reports the vote count for every option, including options that received zero votes.

## Project Structure

```
script.js   # The entire application: poll state, addOption(), vote(), displayResults()
```

## Running

Requires a modern Node.js runtime (e.g. Node 18+).

```bash
node script.js
```

### Example of Expected Output

```
Poll Results:
Turkey: 2 votes
Morocco: 1 votes
Spain: 0 votes
```

## API

| Function | Description |
| --- | --- |
| `addOption(option)` | Adds a new option to the poll. Returns an error message if the option is empty or already exists; otherwise confirms the addition. |
| `vote(option, voterId)` | Casts a vote for an existing option. Returns an error message if the option doesn't exist or the voter has already voted for it; otherwise confirms the vote. |
| `displayResults()` | Returns a formatted string listing every option and its vote count. |

### Behavior Details

- **Empty options are rejected** — `addOption('')` returns `'Option cannot be empty.'`
- **Duplicate options are rejected** — adding an existing option returns `Option "..." already exists.`
- **One vote per voter per option** — a second call to `vote(option, voterId)` with the same `voterId` is ignored.
- **Order is preserved** — options are displayed in the order they were added (`Map` iteration order).

## Demo

The demo at the bottom of `script.js` implements two user stories:

1. *"A poll must have at least three options."* → Three options are added: `Turkey`, `Morocco`, `Spain`.
2. *"A poll must receive at least three votes."* → Three votes are cast: `user1` and `user2` vote for `Turkey`, and `user3` votes for `Morocco`.

After the demo runs, `displayResults()` prints the final results shown above (note that `Spain` correctly shows 0 votes).

## Design Notes

- `Map` is used instead of a plain object so option names can be arbitrary strings without key-collision concerns, and insertion order is guaranteed.
- `Set` is used for voters because voter IDs are unique per option.
- Each function returns a human-readable status string rather than throwing, which keeps the demo script simple to read and run.

## Extending

Some ideas for future work:

- Persist votes (e.g. `localStorage` or a backend).
- Add a `removeOption()` / voting deadline.
- Render results in a browser with a small HTML page instead of `console.log`.