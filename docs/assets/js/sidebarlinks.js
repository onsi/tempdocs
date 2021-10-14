(() => {
  let sidebar = document.getElementById("sidebar")
  let headings = document.querySelectorAll("#content h2,h3")
  let headingsLookup = {}
  let currentHeadingGroup = null
  let collapsibleGroup = null
  for (let heading of headings) {
    let el = document.createElement("a")
    el.href = `#${heading.id}`
    el.innerText = heading.innerText

    if (heading.tagName == "H2") {
      currentHeadingGroup = heading.id

      el.classList = "sidebar-heading"
      el.id = `${heading.id}-section`
      sidebar.appendChild(el)

      collapsibleGroup = document.createElement("div")
      collapsibleGroup.classList = "sidebar-section"
      sidebar.appendChild(collapsibleGroup)

      sidebar.appendChild(document.createElement("hr"))
    } else {
      el.classList = "sidebar-item"
      collapsibleGroup.appendChild(el)
    }

    headingsLookup[heading.id] = currentHeadingGroup
  }

  let ticking = false;
  document.getElementById("content").addEventListener("scroll", function(e) {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        let viewportHeight = window.visualViewport.height;
        let winner = null;
        for (let heading of headings) {
          let rect = heading.getBoundingClientRect();
          if (rect.top > viewportHeight) { break }
          winner = headingsLookup[heading.id]
          if (rect.top > 0) { break }
        }
        document.querySelectorAll(".sidebar-heading.active").forEach(e => e.classList.remove("active"))
        document.getElementById(`${winner}-section`).classList.add("active")
        ticking = false;
      });

      ticking = true;
    }
  })  
})()
