const loading = document.getElementById("loading");
const error = document.getElementById("error");
const notFound = document.getElementById("not-found");
const article = document.getElementById("condition");
const saveButton = document.getElementById("save-button");

const id = new URLSearchParams(window.location.search).get("id");

async function loadCondition() {
  try {
    if (!id) {
      notFound.hidden = false;
      return;
    }

    const response = await fetch("data/conditions.json");
    if (!response.ok) {
      throw new Error("Status " + response.status);
    }
    const conditions = await response.json();
    const condition = conditions.find((c) => c.id === id);

    if (!condition) {
      notFound.hidden = false;
      return;
    }
    showCondition(condition);
  } catch (err) {
    console.error(err);
    error.hidden = false;
  } finally {
    loading.hidden = true;
  }
}


function fillList(listId, items) {
  const ul = document.getElementById(listId);
  ul.replaceChildren();
  (items || []).forEach((item) => {
    const li = document.createElement("li");
    if (typeof item === "object" && item.url) {
      const a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.title || item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      li.appendChild(a);
    } else {
      li.textContent = typeof item === "object" ? item.title : item;
    }
    ul.appendChild(li);
  });
}

function updateSaveButton() {
  const saved = isSaved(id);
  saveButton.textContent = saved ? "Remove from saved" : "Save this condition";
  saveButton.setAttribute("aria-pressed", saved);
}

function showCondition(c) {
  document.title = c.title + " | Kids First Aid Guide";
  document.getElementById("title").textContent = c.title;
  document.getElementById("summary").textContent = c.summary;
  fillList("emergency", c.callEmergencyIf);
  fillList("steps", c.steps);
  fillList("watch", c.watchFor);
  fillList("sources", c.sources);
  article.hidden = false;
  updateSaveButton();
}

saveButton.addEventListener("click", () => {
  toggleSaved(id);
  updateSaveButton();
});

loadCondition();