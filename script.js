// async/await = async = makes a function return a promise
//               await = makes an async function wait for a promise
                
//              Allows you write asynchronous code in a syncronous manner
//              Async doesn't have resolve or reject parameters
//              Everything after Await is placed in an event queue


// I want the page to pull information from the jsons and put it into seperate tabs that are minimized by default. someone searches for something then it will scroll
// down to the condition and give the information. 

// Get the data
// for each condition, make a panel,
// Make a user 
// a search bar with inputs
// allow typing of a condition
// match typing to condition
// page scrolls to condition and opens it
// detailed information at the condition

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const list = document.getElementById("condition-list");
const noResults = document.getElementById("no-results");
const count = document.getElementById("saved-count")
const tab = document.getElementById("all-conditions");
const savedList = document.getElementById("saved-list");
const savedEmpty = document.getElementById("saved-empty");
const clearButton = document.getElementById("clear-saved");


let allConditions = [];

async function loadConditions() {
  try {
    const response = await fetch("data/conditions.json");
    if (!response.ok) {
      throw new Error("Status " + response.status);
    }
    allConditions = await response.json();
    buildList();
    filterList();
    renderSaved();
  } catch (err) {
    console.error(err);
    error.hidden = false;
  } finally {
    loading.hidden = true;
  }
}

function buildList() {
  list.replaceChildren();
  allConditions.forEach((c) => {
    const li = document.createElement("li");
    li.dataset.id = c.id;

    const link = document.createElement("a");
    link.href = "condition.html?id=" + encodeURIComponent(c.id);
    link.textContent = c.title;

    const summary = document.createElement("p");
    summary.textContent = c.summary;

    li.append(link, summary);
    list.appendChild(li);
  });
}

function getMatches() {
  const text = input.value.trim().toLowerCase();
  return allConditions.filter((c) =>
    [c.title, c.summary, c.category, ...(c.keywords || [])]
      .join(" ")
      .toLowerCase()
      .includes(text)
  );
}

function filterList() {
  const matches = getMatches();
  
  tab.open = input.value.trim() !== "";

  list.querySelectorAll("li").forEach((li) => {
    li.hidden = !matches.some((c) => c.id === li.dataset.id);
  });

  noResults.hidden = matches.length > 0;
}

function updateSavedCount() {
  const total = getSaved().length;
  count.textContent = total + (total === 1 ? " condition saved" : " conditions saved");
}

function renderSaved() {
  updateSavedCount();
  if (allConditions.length === 0) {
    return;
  }
 
  const saved = getSaved().filter((id) => allConditions.some((c) => c.id === id));
  savedList.replaceChildren();
 
  saved.forEach((id) => {
    const c = allConditions.find((item) => item.id === id);
    const li = document.createElement("li");
 
    const link = document.createElement("a");
    link.href = "condition.html?id=" + encodeURIComponent(id);
    link.textContent = c.title;
 
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.dataset.id = id;
    remove.setAttribute("aria-label", "Remove " + c.title + " from saved");
 
    li.append(link, " ", remove);
    savedList.appendChild(li);
  });
 
  savedEmpty.hidden = saved.length > 0;
  clearButton.hidden = saved.length === 0;
}
 


input.addEventListener("input", filterList);
form.addEventListener("submit", (e) => e.preventDefault());
window.addEventListener("pageshow", renderSaved);
 
savedList.addEventListener("click", (e) => {
  const button = e.target.closest("button[data-id]");
  if (button) {
    toggleSaved(button.dataset.id);
    renderSaved();
  }
});
 
clearButton.addEventListener("click", () => {
  if (confirm("Remove all saved conditions?")) {
    clearSaved();
    renderSaved();
  }
});

updateSavedCount();
loadConditions();
