# Projekt zaliczeniowy: testy i kontrola jakości

Prosta aplikacja sklepu internetowego zbudowana w oparciu o React, TypeScript i Vite. Aplikacja pozwala przeglądać listę produktów, logować użytkownika oraz zarządzać koszykiem. Projekt zawiera testy jednostkowe w Jest oraz testy end-to-end w Cypress.

> **Ważne:** projekt celowo jest nieidealny i posiada ograniczoną funkcjonalnośc, po prostu ma być co testować
## Wymagania

- Node.js 20 lub nowszy
- npm

## Instalacja

Zainstaluj zależności poleceniem:

```bash
npm ci
```

Jeśli chcesz użyć standardowej instalacji npm, możesz też uruchomić:

```bash
npm install
```

## Uruchomienie projektu

Aby uruchomić aplikację lokalnie w trybie developerskim:

```bash
npm run start
```

Domyślnie aplikacja będzie dostępna pod adresem:

```text
http://localhost:5173
```

## Budowanie projektu

Aby zbudować wersję produkcyjną:

```bash
npm run build
```

## Testy

### Testy jednostkowe

Uruchomienie testów jednostkowych:

```bash
npm run test:unit
```

### Testy E2E

Testy Cypress wymagają działającej aplikacji pod `http://localhost:5173`.

1. W pierwszym terminalu uruchom aplikację:

```bash
npm run start
```

2. W drugim terminalu uruchom testy E2E:

```bash
npm run test:e2e
```

### Wszystkie testy

Skrypt:

```bash
npm run test
```

uruchamia testy jednostkowe i E2E równolegle, ale nie startuje serwera Vite automatycznie. Przed jego użyciem uruchom wcześniej aplikację przez `npm run start`.

## Dodatkowe polecenia

Sprawdzenie lintingu:

```bash
npm run lint
```
