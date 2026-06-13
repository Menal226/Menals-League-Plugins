export function load() {
  const controllers = new Map()

  const observer = new MutationObserver(() => {
    const allSlots = document.querySelectorAll(".bench-champion-background")
    allSlots.forEach((slot) => {
      const background = window.getComputedStyle(slot).backgroundImage
      if (!background.includes(".png")) return
      const champId = background.match(/^url\("https:\/\/\d{1,3}(?:\.\d{1,3}){3}:\d+\/.*\/(\d+)\.png"\)$/)[1]
  
      const portrait = slot.parentElement.parentElement
      portrait.classList.remove("on-cooldown1", "on-cooldown2", "on-cooldown3")
      if (portrait.dataset.benchChampId === champId) return

      controllers.get(champId)?.abort()
      const controller = new AbortController()
      controllers.set(champId, controller)
      portrait.dataset.benchChampId = champId
  
      portrait.addEventListener("click", async () => {
        await fetch(`/lol-champ-select/v1/session/bench/swap/${champId}`, { method: "POST" })
      }, { signal: controller.signal })
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
}