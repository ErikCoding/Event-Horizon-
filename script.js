// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px 300px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all animated elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".section-header, .service-card, .timeline-item, .portfolio-card, .testimonial-content, .contact-form",
  )

  animatedElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })

  const portfolioScroll = document.querySelector(".portfolio-scroll")

  const isMobile = window.innerWidth <= 768

  if (!isMobile) {
    // Desktop: Use CSS animation, pause on hover is handled by CSS
    portfolioScroll.addEventListener("mouseenter", () => {
      portfolioScroll.style.animationPlayState = "paused"
    })

    portfolioScroll.addEventListener("mouseleave", () => {
      portfolioScroll.style.animationPlayState = "running"
    })
  } else {
    let isDown = false
    let startX
    let scrollLeft

    portfolioScroll.addEventListener("touchstart", (e) => {
      isDown = true
      startX = e.touches[0].pageX - portfolioScroll.offsetLeft
      scrollLeft = portfolioScroll.scrollLeft
    })

    portfolioScroll.addEventListener("touchend", () => {
      isDown = false
    })

    portfolioScroll.addEventListener("touchmove", (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.touches[0].pageX - portfolioScroll.offsetLeft
      const walk = (x - startX) * 2
      portfolioScroll.scrollLeft = scrollLeft - walk
    })

    portfolioScroll.addEventListener(
      "scroll",
      () => {
        const indicator = document.querySelector("#portfolio::after")
        if (indicator) {
          portfolioScroll.classList.add("scrolled")
        }
      },
      { once: true },
    )
  }

  const themeToggle = document.getElementById("themeToggle")
  const themeIcon = themeToggle.querySelector(".theme-icon")

  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem("theme") || "dark"
  document.documentElement.setAttribute("data-theme", currentTheme)
  updateThemeIcon(currentTheme)

  themeToggle.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme")
    const newTheme = theme === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)
  })

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.textContent = "☀️"
    } else {
      themeIcon.textContent = "🌙"
    }
  }
})

// Form submission handler
function handleSubmit(event) {
  event.preventDefault()
  const btn = event.target.querySelector(".submit-btn")
  const originalText = btn.querySelector("span").textContent

  btn.querySelector("span").textContent = "Wysyłanie..."
  btn.disabled = true

  // Simulate form submission
  setTimeout(() => {
    btn.querySelector("span").textContent = "Wysłano! ✓"
    setTimeout(() => {
      btn.querySelector("span").textContent = originalText
      btn.disabled = false
      event.target.reset()
    }, 2000)
  }, 1500)
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Parallax effect for hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero-content")
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
    hero.style.opacity = 1 - scrolled / window.innerHeight
  }
})
