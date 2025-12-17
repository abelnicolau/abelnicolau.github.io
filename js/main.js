document.getElementById("orcid").href = personal.orcid;
document.getElementById("scholar").href = personal.scholar;

const orcidRaw = JSON.parse(
  document.getElementById("orcid-data").textContent || "{}"
);

function parseOrcid(orcid) {
  if (!orcid.group) return [];
  return orcid.group.map(g => {
    const w = g["work-summary"][0];
    return {
      authors: personal.name + " et al.",
      year: w["publication-date"]?.year?.value || "n.d.",
      title: w.title.title.value,
      journal: w["journal-title"]?.value || "",
      doi: w["external-ids"]["external-id"]?.[0]?.["external-id-value"]
    };
  });
}

const publications = [...parseOrcid(orcidRaw), ...publicationsManual];
const pubSection = document.getElementById("publications");

publications.forEach(p => {
  const el = document.createElement("p");
  el.innerHTML = `${p.authors} (${p.year}). <i>${p.title}</i>. ${p.journal}. <a href="${p.doi}" target="_blank">DOI</a>`;
  pubSection.appendChild(el);
});