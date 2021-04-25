# Snackbar

Snackbars are used to provide an information regarding an operation at the bottom of the screen. We supplement [this snackbar](https://callstack.github.io/react-native-paper/snackbar.html) with the usage of context in order to make it a global component.

We decided to make this component a global one rather than a local one because of several reasons:

1. This component can cover a broad usage, and if not made global, will potentially be reused in most screens
2. We want to standardize its styles across the app (sometimes rendering it in a child will potentially makes it looks different)
