(() => {
  const wrap = document.getElementById("mainChart");
  const tooltip = document.getElementById("chartTooltip");
  if (!wrap || !tooltip) return;
  wrap.querySelectorAll(".hover-zone").forEach((zone) => {
    zone.addEventListener("mousemove", (event) => {
      const rect = wrap.getBoundingClientRect();
      tooltip.hidden = false;
      tooltip.style.left = `${event.clientX - rect.left + wrap.scrollLeft}px`;
      tooltip.style.top = `${event.clientY - rect.top + wrap.scrollTop}px`;
      tooltip.innerHTML = `<strong>${zone.dataset.date}</strong><span>新增 stars：${zone.dataset.stars}</span><span>累计 stars：${new Intl.NumberFormat("en-US").format(Number(zone.dataset.cumulative))}</span>`;
    });
    zone.addEventListener("mouseleave", () => { tooltip.hidden = true; });
  });
})();
