# 🔐 Guide d'Authentification - Banque Populaire du Maroc Dashboard

## Système d'Authentification

Le système utilise un **identifiant numérique** pour la connexion.

### 📝 Inscription (RegisterPage)

Lors de l'inscription, l'utilisateur doit entrer :
1. **Nom complet** - Votre nom
2. **Email** - Votre adresse email
3. **Identifiant numérique** - Un numéro unique (chiffres uniquement)
4. **Mot de passe** - Mot de passe sécurisé

L'identifiant est **obligatoirement numérique** et doit être **unique** (pas deux utilisateurs avec le même identifiant).

### 🔑 Connexion (LoginPage)

Pour se connecter, entrez :
- **Identifiant** : Votre numéro d'identifiant
- **Mot de passe** : Votre mot de passe

## 📊 Comptes de Test Disponibles

L'application fournit 3 comptes de démonstration :

| Identifiant | Email | Mot de passe | Nom |
|---|---|---|---|
| `123456789` | test@bpmaroc.ma | BPM2024! | Banque Populaire du Maroc |
| `987654321` | pro@example.com | Secure123! | Client Professionnel |
| `555666777` | demo@bpmaroc.ma | Demo2024! | Demo User |

## 💾 Stockage des Données

- **Comptes de démo** : Intégrés dans le code (toujours disponibles)
- **Nouveaux comptes** : Sauvegardés dans le **localStorage** du navigateur
  - Les données persistent jusqu'à vidage du cache
  - Les données sont stockées sur le navigateur local uniquement

### Structure d'un utilisateur enregistré

```json
{
  "identifier": "123456789",
  "fullName": "Nom Utilisateur",
  "email": "user@example.com",
  "password": "Motdepasse123!"
}
```

## 🔐 Validations

✅ **Identifiant** : Doit contenir **uniquement des chiffres**
✅ **Email** : Format email valide
✅ **Mot de passe** : Doit avoir au moins 8 caractères avec majuscules, minuscules et caractères spéciaux
✅ **Unicité** : L'identifiant ne peut pas être dupliqué

## ⚠️ Sécurité

⚠️ **Cette implémentation est à titre de démonstration uniquement.**

Pour une application en production :
- Les mots de passe doivent être **hashés** (bcrypt, argon2, etc.)
- Une **base de données sécurisée** (PostgreSQL, MongoDB, etc.) doit être utilisée
- L'authentification doit utiliser des standards : **OAuth 2.0**, **JWT**, **Session**
- Le **localStorage** ne doit pas être utilisé pour les données sensibles
- Les données sensibles ne doivent jamais être exposées au client

## 🚀 Flux d'Utilisation

### Première visite
```
1. Cliquer sur "S'inscrire"
2. Remplir le formulaire avec :
   - Nom complet
   - Email
   - Identifiant numérique unique
   - Mot de passe fort
3. Les données sont sauvegardées dans localStorage
```

### Connexion suivante
```
1. Entrer l'identifiant numérique
2. Entrer le mot de passe
3. Accès au dashboard
```

## 📝 Exemple Complet

**Inscription** :
```
Nom : Marie Dupont
Email : marie.dupont@email.com
Identifiant : 192837465
Mot de passe : SuperSecure@123
↓
Compte créé et sauvegardé
```

**Connexion** :
```
Identifiant : 192837465
Mot de passe : SuperSecure@123
↓
Connexion réussie → Dashboard
```

---

**Dernière mise à jour** : 30 Décembre 2025

