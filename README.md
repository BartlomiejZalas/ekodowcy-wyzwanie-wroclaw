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
Część serwerowa napisana w Spring Boot. Jest odpowiedzialna za wystawienie API używanego przez portal www i aplikacje mobilne.

### frontend
Strona www zawierająca portal EKOtrasa z danymi.

### mobile
Aplikacja mobilna EKOtrasa.

## Uruchomienie

### backend i frontend
Cześć backendowa i frontendowa jest zdokeryzowana. Można ją odpalić za pomocą:

```bash
docker-compose build
docker-compose up
```
Frontend będzie dostępny pod `http://localhost:5000`. 

### mobile
Aplikacja mobilna jest napisana w React Native. Instrukcja przygotowania środowiska jest tutaj: https://reactnative.dev/docs/environment-setup.
Po skonfigurowaniu środowiska można ją odpalić za pomocą:
```bash
npm run start
npm run android
```