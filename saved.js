const SAVED_KEY = "savedConditions";

function getSaved() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
  } catch (err) {
    return [];
  }
}

function setSaved(ids) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
  } catch (err) {
    console.error(err);
  }
}

function isSaved(id) {
  return getSaved().includes(id);
}

function toggleSaved(id) {
  const saved = getSaved();
  setSaved(isSaved(id) ? saved.filter((savedId) => savedId !== id) : [...saved, id]);
}