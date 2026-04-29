# InboxPilot — Лендинг AI-ассистента для входящих заявок

## Что это

Учебный продающий лендинг для сервиса InboxPilot — AI-ассистент, который обрабатывает входящие заявки бизнеса из Telegram, Instagram Direct, форм на сайте.

**Тип проекта:** service landing page (статический сайт)  
**Аудитория:** малый бизнес, который теряет заявки в переписках  
**Главный CTA:** «Получить разбор входящих заявок»  
**Статус:** ✅ Live — https://inboxpilot-landing.pages.dev/

## Стек

- **Astro 6.1.10** — статический генератор, no JS by default
- **TypeScript** — типизация в компонентах
- **Clean CSS** — токены + утилиты, никаких CSS-фреймворков
- **Inter** — единственный шрифт, Google Fonts

## Деплой

Сайт задеплоен на **Cloudflare Pages**: https://inboxpilot-landing.pages.dev/

Деплой автоматический: пуш в `master` → Cloudflare строит и публикует. Конфигурация деплоя в настройках Cloudflare Pages (не в репо).

## Запуск

```bash
npm install
npm run dev       # localhost:4321
npm run build     # сборка в dist/
npm run preview   # превью собранного сайта
```

## Проверка перед сдачей

```bash
# 1. Сборка (ловит то что не видит typecheck)
npm run build

# 2. Визуальная проверка через mcp__Claude_Preview
# screenshot desktop 1280px + mobile 375px

# 3. Lighthouse Performance ≥ 90
```

## Структура секций (порядок в index.astro)

```
1.  Header      — навигация, логотип, CTA-кнопка
2.  Hero        — H1, подзаголовок, chat-mockup справа
3.  TrustStrip  — логотипы / короткие социальные доказательства
4.  Problem     — боль клиента (заявки теряются)
5.  WhatWeDo    — что именно делает InboxPilot
6.  Benefits    — выгоды для бизнеса
7.  Process     — как это работает (шаги)
8.  WhatYouGet  — что получает клиент на выходе
9.  BeforeAfter — до/после внедрения
10. Cases       — примеры из практики
11. Pricing     — тарифы / пакеты
12. ForWhom     — кому подходит (портреты)
13. FAQ         — частые вопросы
14. FinalCTA    — последний призыв к действию
15. Footer      — контакты, ссылки
```

## Ключевые файлы

| Файл | Назначение |
|------|-----------|
| `src/styles/tokens.css` | Все дизайн-токены (цвета, отступы, типографика) |
| `src/styles/global.css` | Сброс, типографика, keyframes, reduced-motion |
| `src/styles/utilities.css` | Переиспользуемые классы (container, section, btn, tag) |
| `src/layouts/BaseLayout.astro` | HTML-каркас, мета-теги, подключение шрифтов |
| `src/pages/index.astro` | Точка сборки — порядок секций |
| `scripts/take-screenshots.mjs` | Делает before/after скриншоты через Playwright |
| `docs/visual-review/` | Артефакты визуального ревью (before/after по секциям и breakpoints) |

## Дизайн-токены (tokens.css)

```
Фон:         --bg: #0d1117        (очень тёмный, почти чёрный)
Поверхность: --surface: #151b23  / --surface-2: #1f2937
Текст:       --text: #f4f7fa     / --text-muted: #9aa4b2
Акцент:      --accent-blue: #4f8cff
Успех:       --accent-green: #22c55e
Шрифт:       Inter (400/500/600/700)
```

## Design direction

**Dark luxury / SaaS dark** — не «тёмный ради моды», а интерфейсный тёмный с акцентом на читаемость и доверие.

- Строгая иерархия через scale, не через цвет
- Единственный акцент — синий #4f8cff
- Карточки с тонкими бордерами и inset-shadow

## Animation policy

Анимации только через `transform` и `opacity` (compositor-safe). `box-shadow` и `border-color` используются в hover-состояниях, но не анимируются через `@keyframes`.

**Активные анимации:**
- `floatY` — плавающий chat-card в Hero (7s, amplitude -7px)
- `breatheGlow` — пульсация декоративных glow-элементов в Hero и FinalCTA (7–9s, opacity 0.72→1)
- `typingDot` — индикатор печатания в chat-mockup

**Hover-переходы (transition, не keyframes):**
- `.btn-primary` — translateY(-1px) + box-shadow glow при hover; outline при focus-visible
- `.trust-metric` — translateY(-1px) + смена цвета value на accent-blue
- `.process-step` — лёгкое изменение background
- `.pricing-card` — border-color + box-shadow (без transform)

**Запрещено:**
- `will-change` — не использовать
- Scroll reveal / stagger reveal — не возвращаем, `.anim`-классы удалены
- Анимации через `width`, `height`, `margin`, `padding`
- Тяжёлые JS-библиотеки (GSAP, Framer Motion и т.п.)

**prefers-reduced-motion:** включён через универсальный селектор в global.css — накрывает все анимации и переходы.

## Что НЕЛЬЗЯ делать в этом проекте

- ❌ Tailwind, UnoCSS или любой CSS-фреймворк
- ❌ React, Vue, Svelte — только `.astro` компоненты
- ❌ Scroll reveal / stagger reveal (`.anim`-классы удалены, не возвращать)
- ❌ `will-change` на анимируемых элементах
- ❌ Тяжёлый JavaScript (GSAP, Framer Motion и т.п.)
- ❌ Backend, API-роуты, серверный рендеринг
- ❌ Изменять порядок секций без обсуждения

## Скиллы для этого проекта

```
📚 Обязательно перед правками:
  • selling-sites       — pre-flight 5 полей, text-review, anti-AI чеклист
  • frontend-design     — компоненты, токены, анимации
  • web-design-guidelines — UI best practices
  • seo                 — meta, og, sitemap, Lighthouse

📚 Перед текстом/копи:
  • brand-voice         — тон, голос
  • ui-animation        — если нужны анимации

📚 При работе с git:
  • commit + github-ops — feature branch, PR workflow

📚 Перед сдачей:
  • verification-loop   — build check + screenshot
```

## Task workflow (T1–T8)

Каждая задача по этой схеме:
```
T1. Task brief — переформулировать задачу в чёткое ТЗ
T2. Skills checklist — прочитать нужные скиллы ДО кода
T3. Plan — показать Вадиму, ждать одобрения
T4. "Приступай" — только после явного одобрения
T5. Code — в feature branch, никогда в main
T6. Verify — npm run build + скриншот + checklist
T7. Update CLAUDE.md / README — часть того же коммита
T8. Commit + PR — Вадим мержит сам
```

## История изменений

| PR | Что сделано |
|----|------------|
| PR #1 | Visual redesign — полный редизайн секций, дизайн-система, токены, тёмная тема |
| PR #3 | Animation polish — breatheGlow, hover-переходы, floatY -7px, btn halo |
| PR #4 | Docs cleanup — CLAUDE.md/README обновлены, `.anim`-классы удалены |

## Known issues (SEO / performance — следующий pass)

- [ ] Нет `og:image` и `og:url` в мета-тегах
- [ ] Нет `sitemap.xml`
- [ ] Нет `robots.txt`
- [ ] Шрифт Inter подключён через `@import` в CSS — медленнее чем `<link rel="preload">`
- [ ] Тексты не прогонялись через `content-team` + `text-polisher`
- [ ] TrustStrip, Cases — учебные заглушки без реального контента клиента

## Важные решения

- **Нет Tailwind** — осознанное решение: токены + утилиты дают полный контроль без vendor lock-in
- **Astro без JS** — лендинг должен быть максимально быстрым, интерактивность не нужна
- **Dark theme only** — light mode не планируется (учебный проект с чётким visual direction)
- **Нет i18n** — только русский язык
- **Нет scroll reveal** — `.anim`-классы удалены, scroll-trigger не будет добавляться
