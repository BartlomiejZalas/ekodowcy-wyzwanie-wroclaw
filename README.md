# Ekodowcy 
### Wyzwanie Wrocław 
#### Klimaton 2021

## Autorzy

- Aleksandra Urbanowicz (projekt koordynator)
- Gabriela Stasiak (analityk biznesowy)
- Roksana Kowalczyk (UI/UX designer)
- Agnieszka Rucińska (backend developer)
- Bartłomiej Zalas (frontend developer)

## Zawartość

### backend
Część serwerow napisana w Spring Boot odpowiadzialna za wystawienia API używanego przez portal www i aplikacje mobilne.

### frontend
Strona www zawierająca portal EKOtrasa z danymi

### mobile
Aplikacja mobilna EKOtrasa

## Uruchomienie

### backend i frontend
Cześć backendowa i frontendowa jest zdokeryzowana. Można ją odpalić za pomocą:

```bash
docker-compose build
docker-compose up
```

### mobile
Aplikacja mobilna jest napisana w React Native. Instrukcja przygotowania środowiska tutaj: https://reactnative.dev/docs/environment-setup
Następnie można ją odpalić za pomocą:
```bash
npm run start
npm run android
```