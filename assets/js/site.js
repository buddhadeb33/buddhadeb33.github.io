(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const initial = stored === "light" || stored === "dark" ? stored : "dark";
  root.setAttribute("data-theme", initial);

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    const toggler = document.getElementById("dark_toggler");
    if (toggler) {
      toggler.checked = next === "dark";
    }
  }

  function ensureFontAwesome() {
    if (document.querySelector('link[href*="font-awesome"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }

  function ensureSkipLink() {
    if (document.querySelector(".skip-link")) return;
    const main = document.querySelector("main");
    if (!main) return;
    if (!main.id) main.id = "main";
    const a = document.createElement("a");
    a.className = "skip-link";
    a.href = "#" + main.id;
    a.textContent = "Skip to content";
    document.body.insertBefore(a, document.body.firstChild);
  }

  function ensureFooterSocial() {
    // Don't duplicate if socials already exist (e.g. Let's talk on homepage)
    if (document.querySelector(".social-bar")) return;
    const footer = document.querySelector(".footer-inner");
    if (!footer) return;
    const whatsapp = "917501385296";
    const bar = document.createElement("div");
    bar.className = "social-bar";
    bar.setAttribute("aria-label", "Social profiles");
    bar.innerHTML =
      '<a class="linkedin" href="https://www.linkedin.com/in/buddhadeb33" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>' +
      '<a class="github" href="https://github.com/buddhadeb33" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>' +
      '<a class="twitter" href="https://twitter.com/buddhadeb33" target="_blank" rel="noopener" aria-label="X (Twitter)" title="X"><i class="fab fa-twitter" aria-hidden="true"></i></a>' +
      (whatsapp
        ? '<a class="whatsapp" href="https://wa.me/' +
          whatsapp +
          '" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp"><i class="fab fa-whatsapp" aria-hidden="true"></i></a>'
        : "") +
      '<a class="medium" href="https://medium.com/@buddhadeb33" target="_blank" rel="noopener" aria-label="Medium" title="Medium"><i class="fab fa-medium-m" aria-hidden="true"></i></a>';
    footer.appendChild(bar);
  }

  function ensureFooterRoadmapLink() {
    const footer = document.querySelector(".footer-inner p");
    if (!footer || footer.querySelector("[data-roadmap-link]")) return;
    if (/roadmap/i.test(footer.textContent || "")) return;
    const nested = /\/(work|blog)\//.test(location.pathname);
    const sep = document.createTextNode(" · ");
    const a = document.createElement("a");
    a.href = (nested ? "../" : "") + "portfolio-roadmap.html";
    a.textContent = "Roadmap";
    a.setAttribute("data-roadmap-link", "1");
    footer.appendChild(sep);
    footer.appendChild(a);
  }

  document.addEventListener("DOMContentLoaded", function () {
    setTheme(root.getAttribute("data-theme"));
    ensureSkipLink();
    ensureFontAwesome();
    ensureFooterSocial();
    ensureFooterRoadmapLink();

    const toggler = document.getElementById("dark_toggler");
    if (toggler) {
      toggler.addEventListener("change", function () {
        setTheme(toggler.checked ? "dark" : "light");
      });
    }

    const menuBtn = document.querySelector("[data-nav-toggle]");
    const links = document.querySelector("[data-nav-links]");
    if (menuBtn && links) {
      menuBtn.addEventListener("click", function () {
        const open = links.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
        menuBtn.textContent = open ? "✕" : "☰";
        document.body.classList.toggle("nav-open", open);
      });

      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
          menuBtn.textContent = "☰";
          document.body.classList.remove("nav-open");
        });
      });

      window.addEventListener("resize", function () {
        if (window.innerWidth > 1024 && links.classList.contains("open")) {
          links.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
          menuBtn.textContent = "☰";
          document.body.classList.remove("nav-open");
        }
      });
    }

    const path = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll("[data-nav-links] a").forEach(function (a) {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      const clean = href.replace(/^\.\.\//, "").replace(/^\.\//, "").replace(/\/$/, "");
      if (
        (clean === "index.html" && (path.endsWith("/") || path.endsWith("index.html") || path.endsWith("buddhadeb33.github.io"))) ||
        path.endsWith(clean) ||
        (clean === "blog" && path.includes("/blog"))
      ) {
        a.setAttribute("aria-current", "page");
      }
    });

    const hashLinks = Array.from(document.querySelectorAll("[data-nav-links] a[href^='#']")).filter(function (a) {
      const id = a.getAttribute("href").slice(1);
      return id && document.getElementById(id);
    });

    if (hashLinks.length) {
      const sections = hashLinks
        .map(function (a) {
          return { link: a, el: document.getElementById(a.getAttribute("href").slice(1)) };
        })
        .sort(function (a, b) {
          return a.el.offsetTop - b.el.offsetTop;
        });

      const homeLink = document.querySelector('[data-nav-links] a[href="index.html"], [data-nav-links] a[href="../index.html"]');

      function syncNavSpy() {
        hashLinks.forEach(function (a) {
          a.classList.remove("is-active");
        });

        const marker = window.scrollY + 120;
        let active = null;
        sections.forEach(function (item) {
          if (item.el.offsetTop <= marker) active = item.link;
        });

        if (active) {
          active.classList.add("is-active");
        } else if (homeLink && window.scrollY < 180) {
          homeLink.classList.add("is-active");
        }
      }

      window.addEventListener("scroll", syncNavSpy, { passive: true });
      syncNavSpy();
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  });
})();
