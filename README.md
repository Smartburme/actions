# Aung Myo Kyaw — Personal Website + Mini Social

Sea-blue theme, gray background. Day text is white, Night text is light green.
Public posts support like, comment, share. Chat and Group with demo realtime via localStorage.
Registration page is wired for Firebase Auth, with placeholders.

## Pages
- `index.html` — Home (public posts with like/comment/share)
- `chat.html` — Member public chat (replace localStorage with Firebase RTDB)
- `group.html` — Public group + Voice loopback demo (WebRTC TODO: signaling)
- `register.html` — Register/Login (Firebase Auth)
- `about.html` — Project info

## Setup
1. Clone repo:
   ```bash
   git clone <your-repo-url> aungmyokyaw-social
   cd aungmyokyaw-social
   ```
2. Open `index.html` with Live Server (or double-click).
3. To enable Firebase Auth:
   - Replace placeholders in `js/firebase.config.js`
   - Add Firebase scripts into `register.html` head section.
4. To use Firebase Realtime Database for chat:
   - Replace localStorage read/write in `js/chat.js` and `js/group.js` with RTDB listeners.

## Theme
- Toggle with the moon button. Preference stored in `localStorage.theme`.

## License
MIT
