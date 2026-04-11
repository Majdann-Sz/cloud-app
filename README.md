# Cloud Task Manager

Autor: **Szymon Majdański**  
Numer studenta: **96692**

---

# Opis projektu

Cloud Task Manager to chmurowa aplikacja webowa umożliwiająca zarządzanie zadaniami (Tasks), wdrożona w środowisku **Microsoft Azure** w architekturze trójwarstwowej.

Aplikacja pozwala użytkownikowi:

- dodawać zadania
- usuwać zadania
- przeglądać listę zadań
- oznaczać zadania jako wykonane
- korzystać z aplikacji wdrożonej w chmurze Azure

Projekt wykorzystuje automatyczne wdrażanie **CI/CD przez GitHub Actions**.

---

# Stos technologiczny

| Warstwa | Technologia |
|--------|------------|
| Frontend | React + Vite |
| Backend | .NET Minimal API |
| Testy | xUnit |
| Baza danych | Azure SQL Database |
| Chmura | Azure App Service |
| Sekrety | Azure Key Vault |
| Automatyzacja | GitHub Actions |

---

# Architektura systemu

Aplikacja została zaprojektowana w architekturze trójwarstwowej:

### Warstwa prezentacji
Frontend React hostowany w Azure App Service

### Warstwa logiki aplikacji
Backend REST API (.NET Minimal API)

### Warstwa danych
Azure SQL Database

Komunikacja między warstwami:

React → HTTPS → .NET API → TCP → Azure SQL Database


---

# Mapowanie komponentów na usługi Azure

| Komponent aplikacji | Usługa Azure |
|---------------------|-------------|
| Frontend | Azure App Service |
| Backend API | Azure App Service |
| Baza danych | Azure SQL Database |
| Sekrety aplikacji | Azure Key Vault |
| Deployment | GitHub Actions |

---

# Endpointy REST API

GET — pobranie listy zadań


POST — dodanie zadania


DELETE — usunięcie zadania


PATCH — zmiana statusu zadania


---

## Status realizacji artefaktów

| Artefakt | Status |
|---------|--------|
| Artefakt 1 | Architektura aplikacji |
| Artefakt 2 | Środowisko Docker |
| Artefakt 5 | Przygotowanie do chmury |
| Artefakt 7 | Azure Key Vault |
| Artefakt 8 | Testy xUnit + CI/CD + DELETE endpoint |

---

## Uruchomienie lokalne projektu

### Backend

cd backend-dotnet
dotnet run


---

### Frontend


cd frontend
npm install
npm run dev


---

## Repozytorium projektu

Projekt dostępny w GitHub:


https://github.com/Majdann-SZ/cloud-app