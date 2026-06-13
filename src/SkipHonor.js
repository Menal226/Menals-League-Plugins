/**
 * @name SkipHonor
 * @description Automatically skips the post game honor screen
 * @author menal
 * @link https://github.com/Menal226/Menals-League-Plugins/blob/main/src/SkipHonor.js
 */

export function init(context) {
  context.socket.observe("/lol-honor-v2/v1/ballot", async (event) => {
    await fetch("/lol-honor-v2/v1/ballot", {method: "DELETE"})
  })
}