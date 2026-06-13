/**
 * @name AutoAcceptQueue
 * @description Automatically accepts queue when a game is found
 * @author menal
 * @link https://github.com/Menal226/Menals-League-Plugins/blob/main/src/AutoAcceptQueue.js
 */


export function init(context) {
  context.socket.observe("/lol-gameflow/v1/gameflow-phase", async (event) => {
    if (event.data === "ReadyCheck") {
      await fetch("/lol-matchmaking/v1/ready-check/accept", {method: "POST"})
    }
  })
}