// ─── SALARY TABLE APPLICATION ──────────────────────────────────────────────
(function () {
    "use strict";

    const ROLES_LIST = window.__ROLES_DATA__ || [];
    const EXPERIENCE_LEVELS = window.__EXPERIENCE_LEVELS__ || [];

    // DOM elements
    const inputSearch = document.getElementById("tableSearch");
    const selectCategory = document.getElementById("tableCategory");
    const selectLocation = document.getElementById("tableLocation");
    const tableBody = document.getElementById("salariesTableBody");
    const displayCount = document.getElementById("displayCount");
    const selectAllCheckbox = document.getElementById("selectAllCheckbox");
    const compareToolbar = document.getElementById("compareToolbar");
    const compareToolbarCount = document.getElementById("compareToolbarCount");
    const clearCompareBtn = document.getElementById("clearCompareBtn");
    const openCompareBtn = document.getElementById("openCompareBtn");

    // ─── COMPARISON STATE ────────────────────────────────────────────────
    let compareList = [];

    // ─── FIX: Attach event listeners for compare toolbar buttons ───────
    if (clearCompareBtn) {
        clearCompareBtn.addEventListener("click", function () {
            compareList = [];
            document.querySelectorAll(".row-checkbox").forEach(function (cb) {
                cb.checked = false;
            });
            if (selectAllCheckbox) selectAllCheckbox.checked = false;
            updateCompareUI();
        });
    }

    if (openCompareBtn) {
        openCompareBtn.addEventListener("click", function () {
            const roles = compareList
                .map(function (roleName) {
                    return ROLES_LIST.find(function (r) {
                        return r.role === roleName;
                    });
                })
                .filter(Boolean);
            if (roles.length >= 2) {
                openComparePanel(roles);
            } else {
                // Not enough roles selected, flash the count
                const countEl = document.getElementById("compareToolbarCount");
                if (countEl) {
                    countEl.style.color = "#ef4444";
                    setTimeout(function () {
                        countEl.style.color = "";
                    }, 600);
                }
            }
        });
    }

    // ─── CURRENCY HELPERS ────────────────────────────────────────────────
    const fmt = (v) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(v);
    const fmtShort = (v) => {
        if (v >= 1000000) return "$" + (v / 1000000).toFixed(1) + "M";
        if (v >= 1000) return "$" + Math.round(v / 1000) + "K";
        return "$" + v;
    };

    // ─── CATEGORY COLORS ────────────────────────────────────────────────
    const categoryColors = {
        Technology: "#0070f3",
        Healthcare: "#00a86b",
        "Finance & Business": "#f5a623",
        "Marketing & Sales": "#7928ca",
        "Education & Public Service": "#007faa",
        "Engineering & Trades": "#e65100",
        "Legal & Public Safety": "#c62828",
        "Service & Hospitality": "#4a5568",
        "Emerging Tech": "#00bcd4",
        "Creative & Design": "#ff6f00",
        "Data & Analytics": "#1565c0",
    };
    const getCategoryColor = (cat) => categoryColors[cat] || "#64748b";

    // ─── SPARKLINE MINI CHART ────────────────────────────────────────────
    function renderSparklineSvg(growth) {
        const pts = [0.2, 0.35, 0.25, 0.5, 0.7, 0.85]
            .map((base, i) => {
                const v = base + (growth / 30) * (i % 2 === 0 ? 1 : -0.3);
                return "" + i * 16 + "," + (32 - v * 28);
            })
            .join(" ");
        const isPos = growth >= 0;
        const color = isPos ? "#10b981" : "#ef4444";
        return (
            '<svg width="60" height="24" viewBox="0 0 80 32" style="display:inline-block;vertical-align:middle;">' +
            '<polyline fill="none" stroke="' +
            color +
            '" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" points="' +
            pts +
            '"/>' +
            '<polygon fill="' +
            color +
            '11" stroke="none" points="' +
            pts +
            ' 80,32 0,32"/>' +
            "</svg>"
        );
    }

    // ─── DETAIL MODAL ────────────────────────────────────────────
    function showDetailModal(roleData, multiplier) {
        const backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop";

        const skillProficiencies = roleData.skills.map(function (skill, i) {
            return {
                name: skill,
                level: Math.min(
                    95,
                    60 + Math.abs(((skill.charCodeAt(0) * 7 + i * 13) % 35))
                ),
            };
        });

        const salaryRange = roleData.high - roleData.low;
        const medianPct = ((roleData.median - roleData.low) / salaryRange) * 100;
        const catColor = getCategoryColor(roleData.category);

        var skillsHtml = "";
        for (var si = 0; si < skillProficiencies.length; si++) {
            var s = skillProficiencies[si];
            skillsHtml +=
                '<div class="flex items-center gap-2">' +
                '<span class="text-[10px] font-mono text-ink w-24 truncate shrink-0">' +
                escapeHtml(s.name) +
                "</span>" +
                '<div class="flex-1 h-2 bg-canvas-soft-2 rounded-full overflow-hidden">' +
                '<div class="h-full rounded-full" style="width:' +
                s.level +
                "%;background:linear-gradient(90deg," +
                catColor +
                "," +
                catColor +
                "88);\"></div>" +
                "</div>" +
                '<span class="text-[9px] font-mono text-mute w-8 text-right">' +
                s.level +
                "%</span>" +
                "</div>";
        }

        var seniorityHtml = "";
        var levelIcons = ["&#x1F331;", "&#x1F33F;", "&#x1F333;", "&#x1F3D4;&#xFE0F;"];
        var levelColors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"];
        var expEntries = Object.entries(EXPERIENCE_LEVELS);
        for (var ei = 0; ei < expEntries.length; ei++) {
            var entry = expEntries[ei];
            var data = entry[1];
            var base = roleData.median;
            var adj = base * data.multiplier * multiplier;
            var maxAdj = base * 1.6 * multiplier;
            var barPct = (adj / maxAdj) * 100;
            seniorityHtml +=
                '<div class="flex items-center gap-2">' +
                '<span class="text-xs">' +
                levelIcons[ei] +
                "</span>" +
                '<div class="flex-1">' +
                '<div class="flex justify-between text-xs mb-0.5">' +
                '<span class="text-ink font-medium">' +
                escapeHtml(data.name) +
                "</span>" +
                '<span class="font-mono font-semibold" style="color:' +
                levelColors[ei] +
                '">' +
                fmt(Math.round(adj)) +
                "</span>" +
                "</div>" +
                '<div class="h-2 bg-canvas-soft-2 rounded-full overflow-hidden">' +
                '<div class="h-full rounded-full" style="width:' +
                barPct +
                "%;background:" +
                levelColors[ei] +
                ';"></div>' +
                "</div>" +
                "</div>" +
                "</div>";
        }

        backdrop.innerHTML =
            '<div class="modal-content">' +
            '<div class="p-6 border-b border-hairline" style="background:linear-gradient(135deg,' +
            catColor +
            '08,transparent);">' +
            '<div class="flex items-start justify-between">' +
            '<div class="flex-1">' +
            '<div class="flex items-center gap-2 mb-1">' +
            '<span class="text-lg">&#x1F4CB;</span>' +
            '<h3 class="text-lg font-semibold text-ink">' +
            escapeHtml(roleData.role) +
            "</h3>" +
            "</div>" +
            '<span class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider mt-1" style="background:' +
            catColor +
            "22;color:" +
            catColor +
            ";border:1px solid " +
            catColor +
            '44;">' +
            '<span style="width:6px;height:6px;border-radius:50%;background:' +
            catColor +
            ";display:inline-block;\"></span>" +
            escapeHtml(roleData.category) +
            "</span>" +
            "</div>" +
            '<button class="modal-close w-8 h-8 rounded-full border border-hairline bg-canvas hover:bg-canvas-soft-2 flex items-center justify-center cursor-pointer transition-colors text-mute hover:text-ink">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
            "</button>" +
            "</div>" +
            "</div>" +
            '<div class="p-6 space-y-5">' +
            '<div>' +
            '<div class="grid grid-cols-3 gap-3 mb-3">' +
            '<div class="stat-highlight">' +
            '<div class="text-[10px] font-mono text-mute uppercase tracking-wider">25th Percentile</div>' +
            '<div class="text-sm font-semibold text-ink font-mono mt-1">' +
            fmt(Math.round(roleData.low * multiplier)) +
            "</div>" +
            "</div>" +
            '<div class="stat-highlight" style="border-color:rgba(0,112,243,0.3);">' +
            '<div class="text-[10px] font-mono text-mute uppercase tracking-wider">Median Salary</div>' +
            '<div class="text-base font-bold text-accent-blue font-mono mt-1">' +
            fmt(Math.round(roleData.median * multiplier)) +
            "</div>" +
            "</div>" +
            '<div class="stat-highlight">' +
            '<div class="text-[10px] font-mono text-mute uppercase tracking-wider">75th Percentile</div>' +
            '<div class="text-sm font-semibold text-ink font-mono mt-1">' +
            fmt(Math.round(roleData.high * multiplier)) +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="relative h-2 bg-canvas-soft-2 rounded-full overflow-hidden mt-2">' +
            '<div class="absolute h-full rounded-full" style="width:100%;background:' +
            catColor +
            '15;"></div>' +
            '<div class="absolute h-full rounded-full" style="left:' +
            ((roleData.low - roleData.low) / salaryRange) * 100 +
            "%;width:" +
            ((roleData.high - roleData.low) / salaryRange) * 100 +
            "%;background:" +
            catColor +
            '30;"></div>' +
            '<div class="absolute top-0 h-full w-1 bg-accent-blue rounded-full" style="left:' +
            medianPct +
            '%;"></div>' +
            "</div>" +
            '<div class="flex justify-between text-[9px] font-mono text-mute mt-1">' +
            "<span>" +
            fmtShort(roleData.low) +
            "</span>" +
            '<span class="text-accent-blue font-semibold">&#9679; Median</span>' +
            "<span>" +
            fmtShort(roleData.high) +
            "</span>" +
            "</div>" +
            "</div>" +
            '<div class="border-t border-hairline pt-4">' +
            '<div class="flex items-center gap-2 mb-2">' +
            '<span class="text-sm">&#x1F4DD;</span>' +
            '<div class="text-xs font-mono text-mute uppercase tracking-wider">Role Description</div>' +
            "</div>" +
            '<p class="text-sm text-ink leading-relaxed pl-6">' +
            escapeHtml(roleData.description) +
            "</p>" +
            "</div>" +
            '<div class="border-t border-hairline pt-4">' +
            '<div class="flex items-center gap-2 mb-2">' +
            '<span class="text-sm">&#x1F4C8;</span>' +
            '<div class="text-xs font-mono text-mute uppercase tracking-wider">Yearly Growth (YoY)</div>' +
            "</div>" +
            '<div class="flex items-center gap-3 pl-6">' +
            '<div class="flex-1 h-2.5 bg-canvas-soft-2 rounded-full overflow-hidden">' +
            '<div class="h-full rounded-full" style="width:' +
            Math.min(100, roleData.growth * 8) +
            "%;background:linear-gradient(90deg,#10b981,#059669);\"></div>" +
            "</div>" +
            '<span class="text-sm font-semibold text-emerald-600 font-mono">+' +
            roleData.growth.toFixed(1) +
            "%</span>" +
            "</div>" +
            "</div>" +
            '<div class="border-t border-hairline pt-4">' +
            '<div class="flex items-center gap-2 mb-3">' +
            '<span class="text-sm">&#x26A1;</span>' +
            '<div class="text-xs font-mono text-mute uppercase tracking-wider">Top Skills &amp; Proficiency</div>' +
            "</div>" +
            '<div class="space-y-2.5 pl-6">' +
            skillsHtml +
            "</div>" +
            "</div>" +
            '<div class="border-t border-hairline pt-4">' +
            '<div class="flex items-center gap-2 mb-3">' +
            '<span class="text-sm">&#x1FAA2;</span>' +
            '<div class="text-xs font-mono text-mute uppercase tracking-wider">Seniority Ladder</div>' +
            "</div>" +
            '<div class="space-y-2 pl-6">' +
            seniorityHtml +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

        document.body.appendChild(backdrop);

        const closeBtn = backdrop.querySelector(".modal-close");
        closeBtn.addEventListener("click", function () {
            closeModal(backdrop);
        });
        backdrop.addEventListener("click", function (e) {
            if (e.target === backdrop) closeModal(backdrop);
        });
        document.addEventListener("keydown", function escHandler(e) {
            if (e.key === "Escape") {
                closeModal(backdrop);
                document.removeEventListener("keydown", escHandler);
            }
        });
    }

    function closeModal(backdrop) {
        const content = backdrop.querySelector(".modal-content");
        if (content) content.classList.add("closing");
        setTimeout(function () {
            backdrop.remove();
        }, 200);
    }

    function escapeHtml(str) {
        if (!str) return "";
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // ─── COMPARISON PANEL (CENTERED COLORFUL MODAL) ────────────────────
    function openComparePanel(compareRoles) {
        const existing = document.querySelector(".compare-panel-overlay");
        if (existing) existing.remove();

        const overlay = document.createElement("div");
        overlay.className = "compare-panel-overlay";

        const growthMax = Math.max.apply(
            null,
            compareRoles.map(function (r) { return r.growth; })
        );
        const medianMax = Math.max.apply(
            null,
            compareRoles.map(function (r) { return r.median; })
        );
        const selectedOpt = selectLocation.options[selectLocation.selectedIndex];
        const multiplier = parseFloat(selectedOpt.getAttribute("data-mult")) || 1.0;

        const colorArr = [
            { main: "#0070f3", light: "#dbeafe", text: "#1e40af", gradient: "linear-gradient(135deg, #0070f3, #3b82f6)" },
            { main: "#7c3aed", light: "#ede9fe", text: "#5b21b6", gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)" },
            { main: "#059669", light: "#d1fae5", text: "#065f46", gradient: "linear-gradient(135deg, #059669, #34d399)" },
            { main: "#d97706", light: "#fef3c7", text: "#92400e", gradient: "linear-gradient(135deg, #d97706, #fbbf24)" },
            { main: "#dc2626", light: "#fee2e2", text: "#991b1b", gradient: "linear-gradient(135deg, #dc2626, #f87171)" },
            { main: "#0891b2", light: "#cffafe", text: "#155e75", gradient: "linear-gradient(135deg, #0891b2, #22d3ee)" },
        ];

        function getColor(i) { return colorArr[i % colorArr.length]; }

        var cardsHtml = "";
        for (var ri = 0; ri < compareRoles.length; ri++) {
            var r = compareRoles[ri];
            var clr = getColor(ri);
            var skillsBadges = "";
            var skillSlice = r.skills.slice(0, 5);
            for (var ski = 0; ski < skillSlice.length; ski++) {
                skillsBadges +=
                    '<span class="compare-skill-badge" style="background:' + clr.light + ";color:" + clr.text + ";border-color:" + clr.main + "44;" + '">' +
                    escapeHtml(skillSlice[ski]) +
                    "</span>";
            }

            cardsHtml +=
                '<div class="compare-card">' +
                '<div class="compare-card-header" style="background:' + clr.gradient + ';">' +
                '<h3 style="color:#fff;">' + escapeHtml(r.role) + '</h3>' +
                '<span style="color:rgba(255,255,255,0.8);">' + escapeHtml(r.category) + '</span>' +
                "</div>" +
                '<div class="compare-card-body">' +
                '<div class="compare-stat-row">' +
                '<div class="compare-stat-label">Median Salary</div>' +
                '<div class="compare-stat-value" style="color:' + clr.main + ';">' + fmt(Math.round(r.median * multiplier)) + '</div>' +
                '<div class="compare-bar-bg">' +
                '<div class="compare-bar-fill" data-width="' + (r.median / medianMax) * 100 + '" style="width:0%;background:' + clr.gradient + ';"></div>' +
                "</div>" +
                "</div>" +
                '<div class="compare-stat-row">' +
                '<div class="compare-stat-label">YoY Growth</div>' +
                '<div class="compare-stat-value" style="color:' + (r.growth >= 5 ? "#059669" : "#d97706") + ';">+' + r.growth.toFixed(1) + '%</div>' +
                '<div class="compare-bar-bg">' +
                '<div class="compare-bar-fill" data-width="' + Math.min(100, r.growth * 8) + '" style="width:0%;background:' + (r.growth >= 5 ? "linear-gradient(135deg, #059669, #34d399)" : "linear-gradient(135deg, #d97706, #fbbf24)") + ';"></div>' +
                "</div>" +
                "</div>" +
                '<div class="compare-stat-row">' +
                '<div class="compare-stat-label">Range</div>' +
                '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                '<span style="font-size:0.85rem;font-weight:600;font-family:var(--font-mono);color:var(--body);">' + fmtShort(r.low) + '</span>' +
                '<span style="font-size:0.75rem;color:var(--mute);font-family:var(--font-mono);">—</span>' +
                '<span style="font-size:0.85rem;font-weight:600;font-family:var(--font-mono);color:var(--body);">' + fmtShort(r.high) + '</span>' +
                "</div>" +
                '<div class="compare-bar-bg" style="position:relative;">' +
                '<div class="compare-bar-fill" data-width="100" style="width:0%;background:' + clr.main + '33;"></div>' +
                '<div class="compare-range-median-marker" style="left:' + ((r.median - r.low) / (r.high - r.low)) * 100 + '%;background:' + clr.main + ';"></div>' +
                "</div>" +
                "</div>" +
                '<div class="compare-stat-row" style="margin-bottom:0;">' +
                '<div class="compare-stat-label">Top Skills</div>' +
                '<div class="compare-skills-grid">' + skillsBadges + "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
        }

        overlay.innerHTML =
            '<div class="compare-panel">' +
            '<div class="compare-panel-header">' +
            "<div>" +
            '<h3 style="font-size:1.1rem;font-weight:600;color:var(--ink);">Salary Comparison</h3>' +
            '<p style="font-size:0.75rem;color:var(--mute);font-family:var(--font-mono);margin-top:0.15rem;">' +
            compareRoles.length + " roles &#183; Location-adjusted values" +
            "</p>" +
            "</div>" +
            '<button id="closeComparePanel" class="w-8 h-8 rounded-full border border-hairline bg-canvas hover:bg-canvas-soft-2 flex items-center justify-center cursor-pointer text-mute hover:text-ink transition-colors">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
            "</button>" +
            "</div>" +
            '<div class="compare-panel-body">' +
            '<div class="compare-card-grid">' + cardsHtml + "</div>" +
            "</div>" +
            "</div>";

        document.body.appendChild(overlay);

        requestAnimationFrame(function () {
            overlay.classList.add("open");
            setTimeout(function () {
                overlay.querySelectorAll(".compare-bar-fill").forEach(function (bar) {
                    bar.style.width = bar.dataset.width + "%";
                });
            }, 150);
        });

        const closeBtn = overlay.querySelector("#closeComparePanel");
        closeBtn.addEventListener("click", function () { closeComparePanel(overlay); });
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) closeComparePanel(overlay);
        });
        document.addEventListener("keydown", function escHandler(e) {
            if (e.key === "Escape") { closeComparePanel(overlay); document.removeEventListener("keydown", escHandler); }
        });
    }

    function closeComparePanel(overlay) {
        var panel = overlay.querySelector(".compare-panel");
        if (panel) panel.classList.add("closing");
        setTimeout(function () { overlay.remove(); }, 250);
    }

    // ─── UPDATE COMPARE UI ──────────────────────────────────────────────
    function updateCompareUI() {
        const count = compareList.length;

        // Always show toolbar, update state
        if (compareToolbar) {
            compareToolbar.style.display = "flex";
            const openBtn = document.getElementById("openCompareBtn");
            if (openBtn) {
                if (count < 2) {
                    openBtn.disabled = true;
                    openBtn.classList.add("opacity-50", "cursor-not-allowed");
                    openBtn.title = "Select at least 2 roles to compare";
                } else {
                    openBtn.disabled = false;
                    openBtn.classList.remove("opacity-50", "cursor-not-allowed");
                    openBtn.title = "Compare selected roles";
                }
            }
        }
        if (compareToolbarCount) {
            compareToolbarCount.textContent = count;
        }

        // Update toolbar empty state text
        var emptyHint = document.getElementById("compareEmptyHint");
        if (emptyHint) {
            if (count === 0) {
                emptyHint.classList.remove("hidden");
            } else {
                emptyHint.classList.add("hidden");
            }
        }

        // Update open compare button text
        const openCompareBtn = document.getElementById("openCompareBtn");
        if (openCompareBtn) {
            openCompareBtn.innerHTML = count >= 2
                ? "Compare &#8594;"
                : "Select 2+ roles";
        }

        let floatBtn = document.getElementById("compareFloatBtn");
        if (count > 0) {
            if (!floatBtn) {
                floatBtn = document.createElement("button");
                floatBtn.id = "compareFloatBtn";
                floatBtn.className =
                    "compare-float-btn fixed bottom-8 right-8 z-50 px-5 py-2.5 rounded-full bg-accent-blue text-white text-sm font-semibold shadow-lg cursor-pointer";
                floatBtn.innerHTML =
                    "Compare Selected (<span id=\"compareCount\">" + count + "</span>)";
                floatBtn.addEventListener("click", function () {
                    const roles = compareList
                        .map(function (roleName) {
                            return ROLES_LIST.find(function (r) {
                                return r.role === roleName;
                            });
                        })
                        .filter(Boolean);
                    if (roles.length >= 2) openComparePanel(roles);
                });
                document.body.appendChild(floatBtn);
            } else {
                document.getElementById("compareCount").textContent = count;
            }
        } else {
            if (floatBtn) floatBtn.remove();
        }
    }

    function toggleCompare(roleName) {
        const idx = compareList.indexOf(roleName);
        if (idx >= 0) compareList.splice(idx, 1);
        else compareList.push(roleName);
        updateCompareUI();
    }

    // ─── RENDER TABLE ────────────────────────────────────────────────────
    function filterAndRenderTable() {
        const query = inputSearch.value.trim().toLowerCase();
        const cat = selectCategory.value;
        const selectedOpt = selectLocation.options[selectLocation.selectedIndex];
        const multiplier = parseFloat(selectedOpt.getAttribute("data-mult")) || 1.0;

        tableBody.innerHTML = "";

        const filtered = ROLES_LIST.filter(function (r) {
            const matchQuery = r.role.toLowerCase().includes(query);
            const matchCat = cat === "" || r.category === cat;
            return matchQuery && matchCat;
        });

        displayCount.textContent = filtered.length;

        if (filtered.length === 0) {
            const tr = document.createElement("tr");
            tr.innerHTML =
                '<td colspan="7" class="px-6 py-12 text-center text-mute font-mono text-xs">No matching roles found. Try adjusting filters.</td>';
            tableBody.appendChild(tr);
            return;
        }

        for (var idx = 0; idx < filtered.length; idx++) {
            var r = filtered[idx];
            var tr = document.createElement("tr");
            tr.className = "hover:bg-canvas-soft transition-colors table-row cursor-pointer";
            tr.style.animation = "fadeInUp 0.4s ease forwards";
            tr.style.animationDelay = idx * 20 + "ms";
            tr.style.opacity = "0";
            var isChecked = compareList.indexOf(r.role) >= 0;
            var growthColor =
                r.growth >= 5 ? "#10b981" : r.growth >= 2 ? "#f59e0b" : "#ef4444";

            tr.innerHTML =
                '<td class="table-row-checkbox">' +
                '<input type="checkbox" class="compare-checkbox row-checkbox" ' +
                (isChecked ? "checked" : "") +
                " /></td>" +
                '<td class="px-6 py-3.5 font-semibold text-ink text-sm">' +
                '<span class="role-name">' +
                escapeHtml(r.role) +
                "</span></td>" +
                '<td class="px-6 py-3.5"><span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider" style="background:' +
                getCategoryColor(r.category) +
                "22;color:" +
                getCategoryColor(r.category) +
                ';">' +
                escapeHtml(r.category) +
                "</span></td>" +
                '<td class="px-6 py-3.5 text-right font-mono text-body text-xs">' +
                fmt(Math.round(r.low * multiplier)) +
                "</td>" +
                '<td class="px-6 py-3.5 text-right font-mono text-accent-blue font-semibold text-sm">' +
                fmt(Math.round(r.median * multiplier)) +
                "</td>" +
                '<td class="px-6 py-3.5 text-right font-mono text-xs" style="color:' +
                growthColor +
                ';">' +
                '<div class="flex items-center justify-end gap-1">' +
                '<span class="font-semibold">' +
                (r.growth >= 0 ? "+" : "") +
                r.growth.toFixed(1) +
                "%</span> " +
                renderSparklineSvg(r.growth) +
                "</div></td>" +
                '<td class="px-6 py-3.5 text-right font-mono text-body text-xs">' +
                fmt(Math.round(r.high * multiplier)) +
                "</td>";

            var cb = tr.querySelector(".row-checkbox");
            if (cb) {
                cb.dataset.role = r.role;
                (function (roleName) {
                    cb.addEventListener("change", function (e) {
                        e.stopPropagation();
                        toggleCompare(roleName);
                    });
                })(r.role);
            }
            (function (roleData, multiplier) {
                tr.addEventListener("click", function (e) {
                    if (e.target.type !== "checkbox") {
                        showDetailModal(roleData, multiplier);
                    }
                });
            })(r, multiplier);
            tableBody.appendChild(tr);
        }
    }

    // ─── SELECT ALL CHECKBOX ────────────────────────────────────────────
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener("change", function () {
            const checkboxes = tableBody.querySelectorAll(".row-checkbox");
            checkboxes.forEach(function (cb) {
                const roleName = cb.dataset.role;
                if (selectAllCheckbox.checked) {
                    if (compareList.indexOf(roleName) < 0) compareList.push(roleName);
                    cb.checked = true;
                } else {
                    var idx = compareList.indexOf(roleName);
                    if (idx >= 0) compareList.splice(idx, 1);
                    cb.checked = false;
                }
            });
            updateCompareUI();
        });
    }

    if (inputSearch)
        inputSearch.addEventListener("input", filterAndRenderTable);
    if (selectCategory)
        selectCategory.addEventListener("change", filterAndRenderTable);
    if (selectLocation)
        selectLocation.addEventListener("change", function (e) {
            filterAndRenderTable();
            if (selectAllCheckbox) selectAllCheckbox.checked = false;
        });

    updateCompareUI();
    filterAndRenderTable();

    // ─── ENHANCED BAR CHART ──────────────────────────────────────────────
    function renderBarChart() {
        const container = document.getElementById("barChartContainer");
        if (!container) return;

        const top10 = ROLES_LIST.slice()
            .sort(function (a, b) {
                return b.median - a.median;
            })
            .slice(0, 10);
        const maxMedian = top10[0].median;

        function getRankBadge(i) {
            if (i === 0)
                return '<span class="rank-badge rank-1" style="font-size:12px;">&#x1F947;</span>';
            if (i === 1)
                return '<span class="rank-badge rank-2">2</span>';
            if (i === 2)
                return '<span class="rank-badge rank-3">3</span>';
            return '<span class="rank-badge rank-default">' + (i + 1) + "</span>";
        }

        var barGradients = [
            "linear-gradient(90deg, #ffd700, #f59e0b)",
            "linear-gradient(90deg, #c0c0c0, #94a3b8)",
            "linear-gradient(90deg, #cd7f32, #a0522d)",
            "linear-gradient(90deg, #0070f3, #2563eb)",
            "linear-gradient(90deg, #7928ca, #7c3aed)",
            "linear-gradient(90deg, #ff0080, #ec4899)",
            "linear-gradient(90deg, #50e3c2, #10b981)",
            "linear-gradient(90deg, #f5a623, #f59e0b)",
            "linear-gradient(90deg, #00bcd4, #06b6d4)",
            "linear-gradient(90deg, #ff4d4d, #ef4444)",
        ];

        var containerHtml = "";
        for (var i = 0; i < top10.length; i++) {
            var r = top10[i];
            var pct = (r.median / maxMedian) * 100;
            containerHtml +=
                '<div class="bar-row card-stack-enter" style="animation-delay:' +
                i * 0.08 +
                's">' +
                '<div class="flex items-center gap-2 mb-1">' +
                getRankBadge(i) +
                '<span class="text-xs font-semibold text-ink truncate flex-1">' +
                escapeHtml(r.role) +
                "</span>" +
                '<span class="text-xs font-mono" style="color:' +
                getCategoryColor(r.category) +
                ";font-weight:600;\">" +
                fmtShort(r.median) +
                "</span>" +
                "</div>" +
                '<div class="flex items-center gap-2">' +
                '<div class="w-full bg-canvas-soft-2 rounded-full h-5 overflow-hidden flex-1">' +
                '<div class="bar-fill h-full rounded-full transition-all duration-1000 ease-out" data-width="' +
                pct +
                '" style="width:0%;background:' +
                barGradients[i] +
                ';"></div>' +
                "</div>" +
                '<span class="text-[10px] font-mono text-mute shrink-0 w-12 text-right">' +
                (getCategoryColor(r.category) ? r.category.split(" ")[0] : "") +
                "</span>" +
                "</div>" +
                "</div>";
        }
        container.innerHTML = containerHtml;

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var fills = container.querySelectorAll(".bar-fill");
                        fills.forEach(function (fill, idx) {
                            setTimeout(function () {
                                fill.style.width = fill.dataset.width + "%";
                            }, idx * 100);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        observer.observe(container);
    }

    renderBarChart();
})();
