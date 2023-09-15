export const replaceCategoryInGrouped = grouped => {
  const updated = { ...grouped }

  if (updated["Aircraft"]) {
    updated["Air-based platforms"] = updated["Aircraft"]
    delete updated["Aircraft"]
  }

  return updated
}
