const botoes = document.querySelectorAll(".whatsapp");
let topbartoggled = false
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        window.open(
            "https://wa.me/5511940143196?text=Olá!%20Gostaria%20de%20entrar%20em%20contato.",
            "_blank"
        );
    });
});
function bg_parallax()
{
    document.querySelector(".hero").style.backgroundPositionY = `${window.scrollY * 0.4}px`;
    
    document.querySelectorAll(".section-generic").forEach(function(bg)
    {
        const y = bg.getBoundingClientRect().top + window.scrollY
        bg.style.backgroundPositionY = `${(window.scrollY-y) * 0.4}px`
    });
}
bg_parallax()
window.addEventListener("scroll", () => 
    {
        bg_parallax()
    }
)
window.addEventListener("click", (event) =>
    {
        if(document.activeElement.id != "nav toggle" && topbartoggled)
        {
            toggleMenu()
        }
        

        const faq_header = event.target.closest(".faq-header");
        if(!faq_header)
        {
            return;
        }
        const faq_container_click = faq_header.parentElement
        faq_container_click.classList.toggle("open");

        faq_container_click.parentElement.querySelectorAll(".faq").forEach(faq_container =>
            {
                if(faq_container_click !== faq_container)
                {
                    faq_container.classList.remove("open")
                }
                const faq_container_header = faq_container.querySelector(".faq-header")

            }
        )
    }
)
function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("open");
    topbartoggled = !topbartoggled
}

document.querySelectorAll(".carousel").forEach(carousel =>
    {
        //const ca_window = carousel.querySelector(":scope > .carousel-window");
        const items = carousel.querySelector(":scope > .carousel-items");
        const next_button = carousel.querySelector(":scope > .next");
        const prev_button = carousel.querySelector(":scope > .prev");

        const slides = items.children;

        let curr_slide = 0;

        let startX = 0;
        let currentX = 0;
        let dragging = false;

        let old_slide = 0
        function goToSlide(index,allowPac) {
            curr_slide = index
            if(curr_slide > slides.length -1)
            {
                if(allowPac)
                {
                    curr_slide = 0
                }else
                {
                    curr_slide = slides.length - 1
                }
                
            }
            if(curr_slide < 0)
            {
                if(allowPac)
                {
                    curr_slide = slides.length - 1
                }else
                {
                    curr_slide = 0
                }
            }

            slides[old_slide].classList.remove("active");
            const slide = slides[curr_slide];
            slide.classList.add("active");

            const carouselCenter = carousel.offsetWidth / 2;
            const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
            
            const offset = slideCenter - carouselCenter;

            items.style.transform = `translateX(${-offset}px)`;

            
            old_slide = curr_slide
        }
        goToSlide(0)
        next_button.addEventListener("click", (event) =>
            {
                curr_slide++
                goToSlide(curr_slide,true)
            }
        )
        prev_button.addEventListener("click", (event) =>
            {
                curr_slide--
                goToSlide(curr_slide,true)
            }
        )

        // Começou a tocar/arrastar
        items.addEventListener("pointerdown", event => {
            if(true)//document.activeElement.tagName !== "BUTTON")
            {
                dragging = true;
                startX = event.clientX;
                currentX = startX;

                

                items.style.transition = "none";
                
            }
        });

        // Está arrastando
        items.addEventListener("pointermove", event => {
            if (!dragging) return;
            items.setPointerCapture(event.pointerId);
            console.log("a")
            currentX = event.clientX;

            const difference = currentX - startX;

            const slide = slides[curr_slide];

            const carouselCenter = carousel.offsetWidth / 2;
            const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
            
            const offset = slideCenter - carouselCenter;

            items.style.transform =
                `translateX(${ -offset + difference }px)`;
        });
        
        // Soltou
        items.addEventListener("pointerup", event => {
            if (!dragging) return;

            dragging = false;

            const difference = currentX - startX;

            items.style.transition = "transform 0.3s ease";

            // Arrastou para a esquerda
            if (difference < -50) {
                goToSlide(curr_slide + 1,false);
            }

            // Arrastou para a direita
            else if (difference > 50) {
                goToSlide(curr_slide - 1,false);
            }

            // Arrastou pouco → volta para o slide atual
            else {
                goToSlide(curr_slide,false);
            }
        });

        carousel.addEventListener("keydown", event => {
            if (event.key === "ArrowRight") {
                goToSlide(curr_slide + 1,true);
            }

            if (event.key === "ArrowLeft") {
                goToSlide(curr_slide - 1,true);
            }
        });
    }
)
            