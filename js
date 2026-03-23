Як додати сучасніший дизайн (5 хвилин)У репозиторії створіть файл modern.js.
У кожному HTML-файлі перед </body> додайте:html

<script src="modern.js" defer></script>

Замініть весь вміст файлу modern.js на код нижче.

Код modern.js (повністю готовий, vanilla 

Додаткові рекомендації (для ще крутішого вигляду)Додайте в <head> (опціонально):html

<script src="https://cdn.tailwindcss.com"></script>

і в modern.js в самому початку додайте рядок tailwind.config = { content: ["*"] }; — тоді можна швидко додавати Tailwind-класи.
Оновіть style.css (2 рядки):css

:root { --primary: #005bbb; --accent: #ffd500; }
.dark { background-color: #111827; color: #f3f4f6; }

Після додавання modern.js сайт стане:

