# Application de guide touristique local basée sur la géolocalisation
![logo](img/logo.png)
## Table des matières

- [Objectif générale du projet](#Objectif-générale-du-projet)
- [Architecture du projet](#Architecture-du-projet)
- [Docker Compose](#Docker-compose)
- [Frontend](#Frontend) 
- [Backend](#Backend)
- [Images Demostration](#Images-Demostration)  
- [Contributeurs](#Contributeurs)

## Objectif générale du projet
Ce projet de guide touristique mobile représente une initiative ambitieuse et innovante
visant à faciliter la découverte du riche patrimoine historique d’une ville. Axée sur l’accessibilité, l’exhaustivité des informations et l’interactivité, cette application mobile se
positionne comme un outil incontournable pour les habitants et les visiteurs souhaitant
explorer en profondeur les monuments et sites historiques locaux.
## Architecture du projet
![logo](img/architecture.jpg)
Cette application touristique a été conçue avec une architecture moderne et évolutive. Le backend a été développé avec le framework Express.js, offrant une API robuste et sécurisée pour gérer les différentes fonctionnalités de l'application. La partie front-end admin a été construite avec React.js, une bibliothèque JavaScript puissante permettant de créer une interface utilisateur dynamique et interactive pour les administrateurs. Cela leur permet de gérer le contenu, les réservations et les informations des utilisateurs de manière efficace. Parallèlement, la partie mobile client a été développée en utilisant React Native, un framework permettant de créer des applications natives pour iOS et Android à partir d'un seul code base en JavaScript/TypeScript. Cela assure une expérience utilisateur fluide et cohérente sur les différents appareils mobiles, tout en partageant une grande partie du code entre les plateformes. Cette architecture modulaire offre de nombreux avantages, notamment en termes de maintenabilité, de scalabilité et de performance globale de l'application touristique.
## docker Compose
```yaml
version: "2.24.6"
services:
 mysql:
    image: mysql:8
    container_name: hossam-mysql-1
    environment:
      MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
      MYSQL_DATABASE: db_pfa
    volumes:
      - ./database:/docker-entrypoint-initdb.d
      - mysql-db:/var/lib/mysql
    ports:
      - "3306:3306"
 app_backend:
  image: hossamchalabi/backend:latest
  container_name: app_backend
  volumes:
   - ./app_backend:/app/backend:ro
  command: npm start
  ports:
   - "5000:5000"
  depends_on:
   - mysql
 app_frontend:
  image: hossamchalabi/frontend:latest
  container_name: app_frontend
  volumes:
    - ./app_front/src:/react/src:ro
  command: npm start
  ports:
    - "3000:3000"
  depends_on:
    - app_backend


volumes:
 mysql-db: {}
```
## Frontend

### Technologies Utilisées
- React JS
- Ant Design
## Structure du projet Frontend
Le projet front-end React JS est organisé autour de cinq parties principaux, chacun répondant à un objectif spécifique et contribuant à l'architecture globale et à la maintenabilité de l'application.

### 1. Login
- ***Objectif*** : Le composant LOGIN est responsable de la gestion de l'authentification des administrateurs dans l'application. Il vise à garantir la sécurité de l'accès à l'application en utilisant le protocole JWT (JSON Web Tokens).
- ***Fonctionnalité*** : Les administrateurs saisissent leurs identifiants dans un formulaire de connexion. Le serveur authentifie ces identifiants et renvoie un jeton JWT stocké de manière sécurisée, qui est ensuite transmis avec chaque requête pour vérifier l'identité et les autorisations de l'administrateur.

### 2. Tableau de bord
- ***Objectif*** : Le composant Dashboard est responsable de la visualisation des statistiques clés de l'application, telles que les informations sur les monuments, les créateurs et les utilisateurs. Il a pour but de fournir aux administrateurs une vue d'ensemble de l'activité et de la performance de l'application.
  
- ***Fonctionnalité*** :Affichage du nombre total de monuments, d'utilisateurs et de créateurs Présentation de ces informations de manière synthétique et visuelle Mise à jour en temps réel des chiffres clés

### 3. Createur
- ***Objectif*** : Permettre aux administrateurs de gérer les informations des créateurs  enregistrés dans l'application.

- ***Fonctionnalité*** : Ajouter, modifier et supprimer des créateurs, afficher la liste des créateurs avec filtres et lier les créateurs aux monuments qu'ils ont créés.

### 4. Monument
- ***Objectif*** : Permettre aux administrateurs de gérer les informations des monuments enregistrés dans l'application..

- ***Fonctionnalité*** : Ajouter, modifier et supprimer des monuments, afficher la liste des monuments avec filtres, visualiser les détails d'un monument spécifique et lier les monuments à leurs créateurs.

### 5. Tourist
- ***Objectif*** : Permettre aux administrateurs de gérer  les comptes des tourists enregistrés dans l'application.

- ***Fonctionnalité*** : Désactiver les comptes des tourists, afficher la liste des utilisateurs avec filtres, visualiser les détails d'un utilisateur spécifique et attribuer des rôles et autorisations aux utilisateurs.

## Backend
### Technologies Utilisées
- Express JS
- MySql
  
## Structure du projet Backend
Le backend développé avec Express.js est connecté à une base de données MySQL et est composé des modules suivants : les modèles (Admin, Avis, Createur, Monument, Tourist) définissant la structure des données, des contrôleurs  gérant la logique métier, et des routes configurant les différents points d'accès de l'API.

### 1. routes
Les fichiers de routes définissent les différents points d'accès de l'API, configurant les URL, les méthodes HTTP et les paramètres attendus pour chaque endpoint. Ils sont responsables du routage des requêtes vers les contrôleurs appropriés.
### 2. controllers
Les fichiers de contrôleurs sont chargés de gérer les requêtes HTTP entrantes. Chaque contrôleur est dédié à une fonctionnalité ou une entité spécifique, exposant des endpoints RESTful. Ces fichiers interagissent directement avec les modèles pour traiter les requêtes et renvoyer les réponses appropriées.
### 3. .models
Les fichiers de modèles représentent les données de l'application. Ils définissent la structure des données qui seront stockées dans la base de données MySQL. Chaque modèle correspond généralement à une table dans la base de données.

## Lancez l'application en local:
1. **Cloner le Project:**
   ```bash
   git clone <repository_url>
   cd <project_folder>
   ```
2. **Demarrez Docker Desktop et lancez le docker-compose**
   ```bash
   docker compose up
   ```
   OU
    ```bash
   docker-compose up
   ```
3. **Veuillez Changer l'URL_API dans app_mobile/ServerLink.js et mettez votre address ip**
4. **Demarrez l'application mobile**
   ```bash
   cd app_mobile
   npx expo start
   ```
### Images Demostration
## Partie adminstrateur
![login](img/images_admin/login(1).png)
![dashboard](img/images_admin/Dashboard.png)
![gestion_Monument](img/images_admin/gestionMonument.png)
![voir_monument](img/images_admin/voirMonument.png)
![gestion_Createur](img/images_admin/gestionCreateur.png)
![voir_createur](img/images_admin/VoirCreateur.png)
![gestion_user](img/images_admin/desactiverUtilisateur.png)

## Partie mobile
<img src="img/images_mobile/LoginUser.png" width="250" height="500" />
<img src="img/images_mobile/Signup.png" width="250" height="500" />
<img src="img/images_mobile/monument.jpg" width="250" height="500" />
<img src="img/images_mobile/hassanII.jpg" width="250" height="500" />
<img src="img/images_mobile/createur.jpg" width="250" height="500" />
<img src="img/images_mobile/koutoubia.jpg" width="250" height="500" />







## Contributeurs
- LIQALI Issam ([GitHub](https://github.com/travolta11))
- CHALABI Hossam ([GitHub](https://github.com/hossam1956))
- JAAFARI CharafEddine ([GitHub](https://github.com/CharafEddineJaafari))
- ERRABIH Abdelmoughit ([GitHub](https://github.com/AbdelmoughitERRABIH))
- ABID Hanane ([GitHub](https://github.com/hananabid24))
- LACHGAR Mohamed  ([Researchgate](https://www.researchgate.net/profile/Mohamed-Lachgar))

