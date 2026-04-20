# BarrioSeguro v3.0 — Firebase + Android

## ✅ Novedades v3
- Pánico con selección de tipo: Robo, Sujeto sospechoso, Incendio, Emergencia
- GPS automático al activar pánico (lat/lng guardados en Firebase)
- Historial de alertas con filtros: Todas / Activas / Resueltas
- Cada alerta muestra: nombre del vecino, tipo, GPS, "Ver en mapa", "Marcar resuelta", "Falsa alarma"
- Vecinos con teléfono, email, rol (Admin/Vecino), iconos llamar/email/eliminar
- Botón "Agregar vecino" manual desde la app
- Diseño oscuro estilo app nativa

---

## 🔧 Generar APK

```bash
npm install
npx cap add android
npx cap sync
npx cap open android
```
Build → Build APK(s) → app-debug.apk

---

## 🔥 Reglas Firestore

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /villas/{villaId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null &&
        get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol == 'admin';
      match /incidentes/{id} {
        allow read, write: if request.auth != null;
      }
      match /mensajes/{id} {
        allow read, write: if request.auth != null;
      }
    }
    match /usuarios/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /vecinos_manuales/{id} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🔐 Firebase Console
1. Authentication → Sign-in method → activa Correo/Contraseña
2. Firestore Database → crea la base de datos → pega las reglas de arriba

## 📱 Contraseña admin
- **angol2026**
