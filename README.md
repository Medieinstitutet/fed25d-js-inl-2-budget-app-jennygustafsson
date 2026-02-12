# Budget App

En budgetapplikation byggd med Vite, TypeScript och vanilla JavaScript.

## Funktioner

- ✅ Lägg till utgifter och intäkter
- ✅ Välj kategori från dropdown-lista
- ✅ Balansberäkning (inkomster - utgifter)
- ✅ Färgkodad balans (grön för positiv, röd för negativ)
- ✅ Radera senaste utgift eller inkomst
- ✅ Spara data i localStorage
- ✅ Kategorier laddas från JSON-fil

## Teknisk stack

- **Vite** - Build tool och dev server
- **TypeScript** - Typad JavaScript
- **SCSS** - Styling
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Installation

```bash
npm install
```

## Utveckling

```bash
npm run dev
```

## Bygga för produktion

```bash
npm run build
```

## Deployment till GitHub Pages

Projektet är konfigurerat för automatisk deployment till GitHub Pages via GitHub Actions.

### Steg för att publicera:

1. **Skapa ett GitHub repository** (om du inte redan har ett)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/DITT-ANVÄNDARNAMN/fed25d-js-inl-2-budget-app-jennygustafsson.git
   git push -u origin main
   ```

2. **Aktivera GitHub Pages i repository-inställningar:**
   - Gå till ditt repository på GitHub
   - Klicka på **Settings** → **Pages**
   - Under **Source**, välj **GitHub Actions**

3. **Uppdatera base path i vite.config.js** (om ditt repo-namn skiljer sig):
   - Öppna `vite.config.js`
   - Uppdatera `base` till ditt repository-namn:
   ```js
   base: "/ditt-repo-namn/"
   ```

4. **Pusha till main/master branch:**
   ```bash
   git push origin main
   ```

5. **GitHub Actions kommer automatiskt att:**
   - Bygga projektet
   - Deploya till GitHub Pages
   - Din app kommer att vara tillgänglig på: `https://ditt-användarnamn.github.io/fed25d-js-inl-2-budget-app-jennygustafsson/`

## Scripts

- `npm run dev` - Starta utvecklingsserver
- `npm run build` - Bygg för produktion
- `npm run preview` - Förhandsgranska produktionsbygg
- `npm run lint` - Kör ESLint
- `npm run lint:fix` - Fixa ESLint-problem automatiskt
- `npm run format` - Formatera kod med Prettier
- `npm run format:check` - Kontrollera kodformatering

## Projektstruktur

```
├── index.html          # HTML-entry point
├── main.ts            # TypeScript huvudfil
├── main.js            # JavaScript huvudfil (ovanpå TypeScript)
├── models.ts          # TypeScript interfaces
├── style.scss         # Styling
├── categories.json    # Kategorier för utgifter/intäkter
├── vite.config.js     # Vite konfiguration
├── tsconfig.json      # TypeScript konfiguration
├── eslint.config.js   # ESLint konfiguration
├── .prettierrc.json   # Prettier konfiguration
└── .github/workflows/ # GitHub Actions workflows
```
