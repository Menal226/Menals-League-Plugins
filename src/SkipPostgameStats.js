/**
 * @name SkipPostgameStats
 * @description Automatically skips stats screen after a game and puts the player back to lobby
 * @author menal
 * @link https://github.com/Menal226/Menals-League-Plugins/blob/main/src/SkipPostgameStats.js
 */

export function init(context) {
  context.socket.observe("/lol-gameflow/v1/gameflow-phase", async (event) => {
    if (event.data === "EndOfGame") {
      await fetch("/lol-lobby/v2/play-again", {method: "POST"})
    }
  })
}