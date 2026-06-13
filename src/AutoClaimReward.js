export function init(context) {
  context.socket.observe("/lol-rewards/v1/grants", async (event) => {
    event.data.forEach(async (reward) => {
      if (reward["info"]["status"] === "PENDING_SELECTION") {
        await fetch(`/lol-rewards/v1/grants/${reward["info"]["id"]}/select`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "grantId": reward["info"]["id"],
            "rewardGroupId": reward["info"]["rewardGroupId"],
            "selections": reward["rewardGroup"]["rewards"].map(subreward => subreward["id"])
          })
        })
      }
    })
  })
}
