# Cloud Task Manager

Autor: Szymon Majdański  
Numer studenta: 96692

---

## Opis projektu

Cloud Task Manager to chmurowa aplikacja webowa umożliwiająca zarządzanie zadaniami.  
Użytkownik może się rejestrować, logować oraz wykonywać pełne operacje CRUD (tworzenie, odczyt, edycja, usuwanie) na swoich zadaniach.

Aplikacja została zaprojektowana zgodnie z architekturą trójwarstwową i będzie wdrożona w środowisku Microsoft Azure.

---

## Stos technologiczny

| Warstwa        | Technologia |
|---------------|------------|
| Front-end     | React 19 + Vite |
| Back-end      | Node.js 24 + Express |
| Baza danych   | Azure SQL Database |
| Konteneryzacja | Docker + Docker Compose |
| Chmura        | Microsoft Azure |

---

## Mapowanie komponentów na usługi Azure

| Komponent aplikacji | Usługa Azure |
|---------------------|-------------|
| Front-end           | Azure App Service (Web App) |
| Back-end API        | Azure App Service (Web App) |
| Baza danych         | Azure SQL Database |
| Obrazy kontenerów   | Azure Container Registry (opcjonalnie) |

---

## Styl architektury

Aplikacja została zaprojektowana w oparciu o architekturę trójwarstwową:

- Warstwa prezentacji (Front-end – React)
- Warstwa logiki aplikacji (Back-end – REST API)
- Warstwa danych (Azure SQL Database)

Komunikacja między warstwami odbywa się z wykorzystaniem protokołu HTTPS (REST API) oraz TCP (połączenie z bazą danych).