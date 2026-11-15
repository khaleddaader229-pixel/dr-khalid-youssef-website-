
/* =====================================================
   Dr. Khalid Youssef - Shared Website Navigation
   Version: 1.0
   Purpose: One accessible side menu for all site pages
   ===================================================== */

(function () {
  "use strict";

  // Prevent duplicate menu creation
  if (document.getElementById("dk-site-menu")) return;

  const groups = [
    {
      title: "الرئيسية",
      pages: [
        ["الرئيسية", "index.html", "house"]
      ]
    },
    {
      title: "عن الطبيب",
      pages: [
        ["السيرة الذاتية والخبرة", "experience.html"],
        ["الشهادات والدورات", "certificates.html"]
      ]
    },
    {
      title: "الخدمات الطبية",
      pages: [
        ["جراحة العظام والكسور", "bones-surgery.html"],
        ["جراحة المفاصل", "joints-surgery.html"],
        ["مناظير الركبة والكتف", "arthroscopy.html"],
        ["إصابات الملاعب", "sports-injuries.html"]
      ]
    },
    {
      title: "المكتبة الطبية",
      pages: [
        ["المعلومات الطبية", "medical-info.html"],
        ["آلام الركبة", "knee-pain.html"],
        ["خشونة الركبة", "knee-osteoarthritis.html"],
        ["ارتشاح الركبة", "knee-effusion.html"],
        ["إصابات أربطة الركبة", "knee-ligament-injuries.html"],
        ["قطع الرباط الصليبي", "acl-tear.html"],
        ["قطع الغضروف الهلالي", "meniscus-tear.html"],
        ["تغيير مفصل الركبة", "knee-replacement.html"],
        ["التهاب أوتار الركبة", "knee-tendinitis.html"],
        ["كسر صابونة الركبة", "patella-fracture.html"],
        ["ألم مقدمة الركبة", "patellofemoral-pain.html"]
      ]
    },
    {
      title: "التأهيل والتمارين",
      pages: [
        ["التمارين العلاجية", "exercises.html"]
      ]
    },
    {
      title: "التواصل والتقييم",
      pages: [
        ["تقييم الطبيب", "rating.html"],
        ["التواصل والحجز", "index.html#contact"]
      ]
    }
  ];

  // Shared menu styling
  const style = document.createElement("style");

  style.textContent = `
    #dk-menu-button {
      position: fixed;
      top: 18px;
      left: 18px;
      z-index: 10002;
      width: 52px;
      height: 52px;
      border: 1px solid #dce5e8;
      border-radius: 14px;
      background: #ffffff;
      color: #145d63;
      box-shadow: 0 4px 18px rgba(0,0,0,.13);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: .2s ease;
    }

    #dk-menu-button:hover {
      background: #edf6f6;
      transform: translateY(-2px);
    }

    #dk-menu-button svg {
      width: 26px;
      height: 26px;
    }

    #dk-menu-overlay {
      position: fixed;
      inset: 0;
      z-index: 10003;
      background: rgba(12, 27, 35, .48);
      opacity: 0;
      visibility: hidden;
      transition: .25s ease;
    }

    #dk-menu-overlay.dk-open {
      opacity: 1;
      visibility: visible;
    }

    #dk-site-menu {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 10004;
      width: min(350px, 88vw);
      background: #ffffff;
      color: #263238;
      box-shadow: 8px 0 35px rgba(0,0,0,.16);
      transform: translateX(-105%);
      transition: transform .28s ease;
      display: flex;
      flex-direction: column;
      direction: rtl;
      text-align: right;
      font-family: "Segoe UI", Tahoma, Arial, sans-serif;
    }

    #dk-site-menu.dk-open {
      transform: translateX(0);
    }

    #dk-menu-header {
      padding: 22px 20px 17px;
      background: #145d63;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    #dk-menu-header strong {
      display: block;
      font-size: 17px;
      line-height: 1.6;
    }

    #dk-menu-header small {
      display: block;
      font-size: 12px;
      opacity: .85;
    }

    #dk-menu-close {
      width: 38px;
      height: 38px;
      border: 1px solid rgba(255,255,255,.4);
      border-radius: 10px;
      background: transparent;
      color: white;
      font-size: 24px;
      cursor: pointer;
    }

    #dk-menu-content {
      overflow-y: auto;
      padding: 12px 15px 28px;
      overscroll-behavior: contain;
    }

    .dk-menu-group {
      margin: 7px 0 15px;
    }

    .dk-menu-group-title {
      color: #145d63;
      font-size: 14px;
      font-weight: 700;
      padding: 8px 9px;
      border-bottom: 1px solid #e7eeee;
      margin-bottom: 5px;
    }

    .dk-menu-link {
      display: block;
      padding: 9px 11px;
      margin: 3px 0;
      border-radius: 9px;
      color: #35464c;
      text-decoration: none;
      font-size: 14px;
      line-height: 1.6;
      transition: .15s ease;
    }

    .dk-menu-link:hover,
    .dk-menu-link:focus-visible {
      background: #edf5f5;
      color: #0f555a;
    }

    .dk-menu-link.dk-active {
      background: #e1f0ef;
      color: #0e5559;
      font-weight: 700;
      border-right: 3px solid #176b70;
    }

    body.dk-menu-visible {
      overflow: hidden;
    }

    @media (max-width: 600px) {
      #dk-menu-button {
        top: 12px;
        left: 12px;
        width: 46px;
        height: 46px;
        border-radius: 12px;
      }

      #dk-menu-header {
        padding-top: 18px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #dk-site-menu,
      #dk-menu-overlay,
      #dk-menu-button {
        transition: none;
      }
    }
  `;

  document.head.appendChild(style);

  // Create menu button
  const button = document.createElement("button");
  button.id = "dk-menu-button";
  button.type = "button";
  button.setAttribute("aria-label", "فتح قائمة الموقع");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "dk-site-menu");

  button.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.2"
         stroke-linecap="round">
      <path d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  `;

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "dk-menu-overlay";

  // Create menu panel
  const menu = document.createElement("aside");
  menu.id = "dk-site-menu";
  menu.setAttribute("aria-label", "قائمة التنقل الرئيسية");

  const header = document.createElement("div");
  header.id = "dk-menu-header";

  header.innerHTML = `
    <div>
      <strong>د. خالد حسن السعيد يوسف</strong>
      <small>جراحة العظام والمفاصل</small>
    </div>
    <button id="dk-menu-close" type="button"
            aria-label="إغلاق القائمة">×</button>
  `;

  const content = document.createElement("nav");
  content.id = "dk-menu-content";
  content.setAttribute("aria-label", "صفحات الموقع");

  const currentFile =
    window.location.pathname.split("/").pop() || "index.html";

  // Build all menu groups and links
  groups.forEach(function (group) {
    const section = document.createElement("section");
    section.className = "dk-menu-group";

    const title = document.createElement("div");
    title.className = "dk-menu-group-title";
    title.textContent = group.title;

    section.appendChild(title);

    group.pages.forEach(function (page) {
      const link = document.createElement("a");

      link.className = "dk-menu-link";
      link.href = page[1];
      link.textContent = page[0];

      const targetFile = page[1].split("#")[0];

      if (targetFile === currentFile) {
        link.classList.add("dk-active");

        if (page[1] === currentFile) {
          link.setAttribute("aria-current", "page");
        }
      }

      section.appendChild(link);
    });

    content.appendChild(section);
  });

  // Assemble menu
  menu.appendChild(header);
  menu.appendChild(content);

  document.body.appendChild(button);
  document.body.appendChild(overlay);
  document.body.appendChild(menu);

  const closeButton = document.getElementById("dk-menu-close");

  // Open menu
  function openMenu() {
    menu.classList.add("dk-open");
    overlay.classList.add("dk-open");
    document.body.classList.add("dk-menu-visible");

    button.setAttribute("aria-expanded", "true");
    closeButton.focus();
  }

  // Close menu
  function closeMenu() {
    menu.classList.remove("dk-open");
    overlay.classList.remove("dk-open");
    document.body.classList.remove("dk-menu-visible");

    button.setAttribute("aria-expanded", "false");
    button.focus();
  }

  button.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  // Close with Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu.classList.contains("dk-open")) {
      closeMenu();
    }
  });

  // Close after selecting a page
  content.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  // ==========================================
  // Google Analytics - Central WhatsApp Tracking
  // ==========================================

  if (typeof window.gtag !== "function") {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", "G-S4C79XGDST");

    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src =
      "https://www.googletagmanager.com/gtag/js?id=G-S4C79XGDST";

    document.head.appendChild(gaScript);
  }

  // Track WhatsApp booking links across the website
  document.addEventListener("click", function (event) {
    const link = event.target.closest('a[href*="wa.me/"]');

    if (!link) return;

    const url = new URL(link.href);

    // Ignore WhatsApp sharing links without a phone number
    if (url.pathname !== "/966565245159" &&
        url.pathname !== "/966565245159/") {
      return;
    }

    // Avoid duplicating an existing booking event
    const existingCode = link.getAttribute("onclick") || "";
    if (existingCode.includes("whatsapp_booking_click")) return;

    window.gtag("event", "whatsapp_booking_click", {
      send_to: "G-S4C79XGDST",
      event_category: "conversion",
      event_label: window.location.pathname,
      transport_type: "beacon"
    });
  }, true);

})();
