/*
 * Kita
 *
 * Build.js
 *
 * This is used as a header for the built, minified script only.
 */
define(
["./kita"], function(Kita) {
    // Make the Kita object global
    this.Kita =   Kita;
});