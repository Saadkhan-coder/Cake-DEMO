const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-link");
const menu = document.querySelector("#menu");
const topButton = document.querySelector(".top-btn");
const orderForm = document.querySelector(".order-form");

const updateHeader = () => {
    const isScrolled = window.scrollY > 20;
    navbar?.classList.toggle("scrolled", isScrolled);
    topButton?.classList.toggle("show", window.scrollY > 420);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const targetId = anchor.getAttribute("href");
        const target = targetId && document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        if (menu?.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
    });
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
    });
});

topButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
});

orderForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = orderForm.querySelectorAll("input, select, textarea");
    let isValid = true;

    fields.forEach((field) => {
        const hasValue = field.value.trim().length > 0;
        field.classList.toggle("is-invalid", !hasValue);
        if (!hasValue) isValid = false;
    });

    if (!isValid) return;

    alert("Thank you! Your cake request has been received.");
    orderForm.reset();
});

console.log("Patani Yash Cakes website loaded.");
