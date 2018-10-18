# Redux

Redux does not make programming the simple things fast, but complex things maintainable.

It is to make robust, growing and maintainable apps.

## Principles of Redux

- **Single Source Of Truth**
  - Each piece of information is stored in a single place (**STORE**), regardless of where it is created, modified or required.
- Read Only State
  - The information of the store will be **read only** and can only be modified through official channels (**ACTIONS**).
- Changes By Pure Functions
  - To specify how the **state tree** is transformed by the actions, *pure functions* (**REDUCERS**) are used.
  - Changes must be replicable, canceled and audited.

Pure functions:

- Return the same result for the same entry (idempotence).
- They do not depend on the environment or random conditions; only from their arguments (isolated).
- No collateral effects or changes in the value of its parameters or other environmental variables (no side effects).

## Redux elements

- Store
  - Dispatches mutated actions
  - Maintains the state and controls its access in read-only mode.

- State
  - Object in memory that contains the only valid copy of the information.
  - Represents the value or status of the store at a certain time.

- Actions
  - Objects with a predefined type and a potential argument called payload.
  - Represent all possible mutations that can affect the state of the store.

- Reducers
  - They are *pure functions*, the only ones that can change the state.
  - They receive the current status (STATE) and an action (ACTION).
  - Clone the state, make the appropriate changes and return the mutated state.