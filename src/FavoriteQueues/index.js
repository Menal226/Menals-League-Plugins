import './theme.css'

function addFavoriteMenu() {
  if (document.querySelector(".favorited-buttons")) return
  const playButton = document.querySelector(".play-button-container")
  if (!playButton) return
  const newDiv = document.createElement("div");
  newDiv.classList.add("favorited-buttons")
  playButton.appendChild(newDiv)
  updateFavoriteMenu()
}

function updateFavoriteMenu() {
  const buttons = document.querySelector(".favorited-buttons")
  if (!buttons) return
  buttons.innerHTML = ""
  const favorited = DataStore.get("favorited-queues", new Array())
  favorited.forEach(async (queueId) => {
    const queueElem = document.createElement("a")
    const queueInfo = await fetch(`/lol-game-queues/v1/queues/${queueId}`).then(async r => await r.json())
    if (!queueInfo["isEnabled"]) return
    queueElem.textContent = queueInfo["description"]
    queueElem.addEventListener("click", async (event) => {
      event.stopPropagation();
      await fetch("/lol-lobby/v2/lobby", {method: "DELETE"})
      await fetch("/lol-lobby/v2/lobby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"queueId": queueId})
      })
    })
    buttons.appendChild(queueElem)
  })
}

function addFavoriteClick() {
  const queueButtons = document.querySelectorAll(".parties-game-type-card-category-btn:not([favorite-done])")
  queueButtons.forEach(btn => {
    btn.setAttribute("favorite-done", "")
    btn.parentNode.addEventListener("contextmenu", async (event) => {
      const currentFavorite = DataStore.get("favorited-queues", new Array())
      const queueId = btn.getAttribute("data-queue-id")
      if (currentFavorite.includes(queueId)){
        await DataStore.set("favorited-queues", currentFavorite.filter(q => q != queueId))
      } else {
        currentFavorite.push(queueId)
        await DataStore.set("favorited-queues", currentFavorite)
      }
      updateFavoriteMenu()
    })
  })
}

export async function load() {
  const observer = new MutationObserver(() => {
    addFavoriteMenu()
    addFavoriteClick()
  })

  observer.observe(document.body, { childList: true, subtree: true })
}