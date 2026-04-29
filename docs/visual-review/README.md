# Visual Review — PR #1 «Визуальный редизайн»

PR: https://github.com/relaxvadim322/inboxpilot-landing/pull/1

| | Коммит | Ветка |
|---|---|---|
| **Baseline (до)** | `5ebce84` | `master` |
| **Redesign (после)** | `fe63058` | `feature/visual-redesign` |

---

## Что снято

Скрипт: `scripts/take-screenshots.mjs`

### Полноэкранные скриншоты (viewport, fullPage: false)

| Ширина | top | mid | bottom |
|---|---|---|---|
| 1440px | ✓ | ✓ | ✓ |
| 1280px | ✓ | ✓ | ✓ |
| 768px | ✓ | ✓ | ✓ |
| 375px | ✓ | ✓ | ✓ |

### Секционные скриншоты (element.screenshot, ширина 1280px)

| Файл | Селектор |
|---|---|
| `section-hero.png` | `.hero` |
| `section-truststrip.png` | `.trust-strip-section` |
| `section-problem.png` | `#problem` |
| `section-whatwedo.png` | `#how-it-works` |
| `section-benefits.png` | `.section:has(.featured-outcomes)` |
| `section-whatyouget.png` | `#what-you-get` |
| `section-pricing.png` | `#pricing` |

### Мобильный вотчтру (375px, 13 позиций прокрутки)

`mobile-hero`, `mobile-truststrip`, `mobile-problem`, `mobile-whatwedo`,
`mobile-benefits`, `mobile-process`, `mobile-whatyouget`, `mobile-beforeafter`,
`mobile-cases`, `mobile-pricing`, `mobile-forwho`, `mobile-faq`, `mobile-finalcta`

**Итого: 32 файла × 2 = 64 скриншота**

---

## Anchor-навигация

| Ссылка | ID | Baseline | Redesign |
|---|---|---|---|
| Проблема | `#problem` | ✓ | ✓ |
| Как работает | `#how-it-works` | ✓ | ✓ |
| Что входит | `#what-you-get` | ✓ | ✓ |
| Примеры | `#cases` | ✓ | ✓ |
| FAQ | `#faq` | ✓ | ✓ |

Все 5 якорей найдены в обеих версиях. В baseline `#how-it-works` уже присутствовал.

---

## Что улучшилось

### 1. TrustStrip — новый раздел
- **До:** отсутствует (Hero содержал маленький inline-текст про срок)
- **После:** компактная метрик-полоска: «7 дней / до запуска», «1 канал / на старте», «Контроль у человека», «от $490» — с вертикальными разделителями, хорошо читается с первого взгляда

### 2. WhatWeDo — убраны синие кружки
- **До:** у каждого шага синий заливной кружок с цифрой (дублировал паттерн Process)
- **После:** числа как приглушённый eyebrow-текст, между шагами стрелки `→` / `↓` — раздел больше не выглядит копией таймлайна

### 3. Benefits — новые карточки
- **До:** синие кружки с числами у outcome-items, монотонный список
- **После:** карточки с `surface-2` + синяя полоска сверху, иконки `→` вместо точек — читается как полноценный раздел выгод, а не список фич

### 4. WhatYouGet — индивидуальные карточки
- **До:** одна общая панель с тремя колонками без визуального разделения
- **После:** три отдельные карточки с заголовками на `surface-2` — каждая группа доставок выделена

### 5. Pricing — двухколоночный макет
- **До:** одна карточка 600px по центру, ~680px пустого пространства слева
- **После:** левая колонка с питч-текстом и стрелками, правая — карточка; полноширинный блок, нет пустоты

### 6. Hero — усиленный glow
- **До:** glow `rgba(79, 140, 255, 0.11)`, 560px — почти не заметен
- **После:** glow `rgba(79, 140, 255, 0.17)`, 680px — читается как акцентная подсветка, добавляет глубины

### 7. FinalCTA — акцентная граница
- **До:** `border-top: 1px solid var(--border)` — нейтральная граница
- **После:** `border-top: 1px solid rgba(79, 140, 255, 0.2)` + более сильный glow — раздел визуально выделяется из потока

### 8. Problem — нейтральные чипы
- **До:** чипы с синей заливкой и синим текстом — ещё один синий паттерн
- **После:** нейтральный border + muted-текст — чипы теперь нейтральные, синий акцент не размывается

---

## Спорное / требует взгляда глазами

### ⚠ section-truststrip.png (before) — неточное сравнение
В baseline `.trust-strip-section` отсутствует (класс добавлен в redesign). Playwright не нашёл элемент и сделал скриншот viewport-fallback → **`before/section-truststrip.png` показывает Hero, а не TrustStrip**. Сравнивать нужно через `before/desktop-1280-top.png` → там TrustStrip отсутствует визуально, а Hero просто переходит в Problem.

### ⚠ section-pricing.png (before) — аналогичный fallback
В master Pricing не имел `id="pricing"`. **`before/section-pricing.png` = viewport-fallback**, не точный вырез секции. Используй `before/desktop-1280-mid.png` для сравнения.

### 🔍 Мобильная секция WhatYouGet (375px)
Три карточки на мобильном стекаются в одну колонку. Проверь `after/mobile-whatyouget.png` — нет ли переполнения текста или слишком длинных карточек.

### 🔍 BeforeAfter — смена фона
Фон колонок изменён с `var(--bg)` на `var(--surface-2)`. Смотри `after/section-benefits.png` и контекст в `after/desktop-1280-mid.png` — проверь что контраст между соседними секциями сохранился.

### 🔍 Pricing на мобильном (375px)
Двухколоночный макет переключается в одну колонку ниже 768px. Проверь `after/mobile-pricing.png` что pitch-колонка + карточка читается в нужном порядке (pitch → card, сверху вниз).

---

## Секции требующие проверки глазами

| Секция | Файлы | На что смотреть |
|---|---|---|
| TrustStrip | `after/section-truststrip.png`, `after/mobile-truststrip.png` | Разделители, перенос на мобильном 2×2 |
| WhatYouGet | `after/section-whatyouget.png`, `after/mobile-whatyouget.png` | Три карточки, адаптив на 375px |
| Pricing | `after/section-pricing.png`, `after/mobile-pricing.png` | 2-кол → 1-кол, порядок блоков |
| Benefits | `after/section-benefits.png`, `after/mobile-benefits.png` | Карточки с синей полоской, контраст |
| WhatWeDo | `after/section-whatwedo.png`, `after/mobile-whatwedo.png` | Стрелки-коннекторы между шагами |
