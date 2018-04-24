# Shame

I'm cutting some corners with this side project to accelerate development. The SHAME file explains high-level tech debt that would be difficult to explain via inline comments. If you want to contribute to Project Aurae (or just provide constructive criticism), this may be a good place to begin.

## Tech debt

### Reducer separation of concerns

**Background:** The initial state of `gameItemsReducer` defines items that may be planted
in a user's garden. When the user selects a plant, the game creates an instance
of it, which is stored in `resourceReducer`. As of 4/23, the created resources
are persisted in localStorage.

**Problem:** The game items details in the saved resources can become stale, and we're storing unnecessary static
data in Redux.

**Possible solution:** Define game items in a static JSON file with item IDs and correlate the item IDs to versioned resources. This requires refactoring the reducers.
