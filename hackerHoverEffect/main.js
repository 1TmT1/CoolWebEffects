const text = document.querySelector("h1");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

text.onmouseover = e => {
    let iterations = 0;
    const min = 1, max = 3;

    const interval = setInterval(() => {
        e.target.innerText = e.target.innerText.split("").map((letter, index) => {

            if (index < iterations) {
                return e.target.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)];
        }).join("");
        if (iterations >= e.target.dataset.value.length) {
            clearInterval(interval);
        }

        iterations += 1 / (Math.random() * (max - min) + min);
    }, 50);
}