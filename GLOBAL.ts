/**
 * A reference to the global object.
 * This is the window in a browser, and the global in node.
 */
export const GLOBAL = new Function('return this')()
