# Instrukcja konfiguracji Formspree

## Czym jest Formspree?

Formspree to usługa, która obsługuje formularze kontaktowe bez potrzeby tworzenia własnego backendu. Działa bardzo prosto:
1. Użytkownik wypełnia formularz na Twojej stronie
2. Formspree odbiera dane i wysyła je na Twój email
3. Możesz odpowiedzieć bezpośrednio z emaila

## Jak to skonfigurować? (5 minut)

### Krok 1: Zarejestruj się na Formspree

1. Wejdź na: **https://formspree.io**
2. Kliknij "Get Started" lub "Sign Up"
3. Zarejestruj się (email + hasło) - **darmowe konto**

### Krok 2: Utwórz nowy formularz

1. Po zalogowaniu kliknij **"+ New Form"**
2. Podaj:
   - **Form name**: np. "Kontakt - Dotacje"
   - **Email address**: Twój email (np. anna@dotacje-firma.pl) - na ten adres będą przychodzić wiadomości
3. Kliknij **"Create Form"**

### Krok 3: Skopiuj Form ID

Po utworzeniu formularza zobaczysz:
```
Your form's endpoint is:
https://formspree.io/f/TWOJ_FORM_ID
```

**TWOJ_FORM_ID** to coś w stylu: `xpznvkjb` (losowy ciąg znaków)

### Krok 4: Wklej ID do HTML

Otwórz plik **index.html** i znajdź linię:

```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/TWOJ_FORM_ID" method="POST">
```

Zamień **TWOJ_FORM_ID** na swój rzeczywisty ID, np:

```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/xpznvkjb" method="POST">
```

### Krok 5: Gotowe! 🎉

Teraz formularz działa:
- Wiadomości trafiają na Twój email
- Formspree wysyła je w formacie: imię, email, telefon, wiadomość
- Możesz odpowiedzieć bezpośrednio z emaila (przycisk Reply)

---

## Jak to działa technicznie?

### W HTML:
```html
<form action="https://formspree.io/f/TWOJ_ID" method="POST">
```
- `action` - adres endpoint Formspree, który odbiera dane
- `method="POST"` - wysyła dane metodą POST

### Specjalne pola:

1. **`name="_replyto"`** - Formspree użyje tego jako adres do odpowiedzi
```html
<input type="email" name="_replyto">
```

2. **`name="_subject"`** - temat emaila
```html
<input type="hidden" name="_subject" value="Nowa wiadomość z formularza">
```

### W JavaScript:

```javascript
// Zbiera dane z formularza
const formData = new FormData(form);

// Wysyła do Formspree
await fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
});
```

---

## Plan darmowy - Limity

✅ **50 wiadomości/miesiąc** - wystarczy dla małej/średniej firmy
✅ Nielimitowane formularze
✅ Spam protection (reCAPTCHA)
✅ File uploads

Jeśli potrzebujesz więcej:
- **Gold**: $10/miesiąc - 1000 wiadomości
- **Platinum**: $40/miesiąc - 10,000 wiadomości

---

## Testowanie

### Przed wdrożeniem (localhost):

1. Otwórz stronę lokalnie (np. `index.html`)
2. Wypełnij formularz
3. Kliknij "Wyślij"
4. **Pierwszy raz** Formspree pokaże stronę z prośbą o potwierdzenie emaila
5. Potwierdź email - od tego momentu wszystko działa automatycznie

### Po wdrożeniu (produkcja):

Po pierwszym potwierdzeniu formularze już nie pokazują strony pośredniej - wysyłka jest natychmiastowa.

---

## Dodatkowe opcje (opcjonalne)

### 1. Custom redirect po wysłaniu:
```html
<input type="hidden" name="_next" value="https://twoja-strona.pl/dziekujemy">
```

### 2. Honeypot (ochrona przed botami):
```html
<input type="text" name="_gotcha" style="display:none">
```

### 3. Email z kopiią do użytkownika:
W ustawieniach formularza na Formspree możesz włączyć "Auto-reply to sender"

---

## Rozwiązywanie problemów

**Problem**: Formularz nie wysyła wiadomości
**Rozwiązanie**:
1. Sprawdź czy wkleiłeś poprawny Form ID w `action`
2. Sprawdź console w przeglądarce (F12) - czy są błędy?
3. Upewnij się, że potwierdziłeś email w Formspree

**Problem**: Wiadomości trafiają do SPAM
**Rozwiązanie**: Dodaj `noreply@formspree.io` do kontaktów

**Problem**: Chcę inny email nadawcy
**Rozwiązanie**: Formspree zawsze wysyła z `noreply@formspree.io`, ale pole "Reply-To" jest ustawione na email użytkownika

---

## Alternatywy (jeśli Formspree nie pasuje)

1. **Web3Forms** - nielimitowane darmowe wiadomości
2. **EmailJS** - 200 maili/miesiąc za darmo
3. **Netlify Forms** - jeśli hosujesz na Netlify (100/miesiąc za darmo)

---

## Bezpieczeństwo

✅ Formspree ma wbudowaną ochronę przed spamem
✅ Dane są wysyłane przez HTTPS (szyfrowane)
✅ Możesz włączyć Google reCAPTCHA w ustawieniach
✅ Formspree nie przechowuje wiadomości dłużej niż 30 dni

---

## Podsumowanie

**Co musisz zrobić:**
1. Zarejestruj się na formspree.io (2 min)
2. Utwórz formularz i skopiuj ID (1 min)
3. Wklej ID do index.html zamiast `TWOJ_FORM_ID` (30 sek)
4. Wyślij testową wiadomość i potwierdź email (1 min)

**Gotowe!** Od tego momentu wszystkie wiadomości z formularza będą trafiać na Twój email.
