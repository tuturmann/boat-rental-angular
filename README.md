# TP Angular

Ce projet a été créé dans le cadre d'une formation Angular que j'ai suivie. \
Il s'agit d'une application de gestion pour une entreprise de location de bateaux.

# Fonctionnalités

L'application est découpée en plusieurs modules et pages :

- Page d'accueil : Tableau de bord et vue d'ensemble de l'application.
- Flotte (Gestion des Bateaux) :
  - CRUD complet : Liste (Read), Ajout (Create), Modification (Update) et Suppression (Delete).
  - Liste et visualisation des bateaux disponibles.
  - Ajout, modification et suppression de bateaux.
  - Sécurité de suppression : Impossible de supprimer un bateau si celui-ci possède des réservations actives dans la base de données.
  - Filtrage des données par n'importe quelle colonne de la liste.
- Clients : Gestion du répertoire des clients (Nom, Prénom, etc.).
- Réservations :
  - Liste complète des réservations de l'entreprise.
  - Enrichissement asynchrone des données (RxJS) : Pour chaque réservation, l'application récupère en parallèle et en temps réel le nom complet du client ainsi que le nom du bateau associé grâce à des mécanismes de flux (`forkJoin`, `switchMap`).

## Technologies utilisées

- Angular (Architecture par composants, Services, Pipes...)
- RxJS (Gestion des flux asynchrones, opérateurs `switchMap`, `map`, `forkJoin`)
- JSON Server (Simulateur d'API REST basé sur un fichier `db.json`)
- SCSS (Préprocesseur CSS pour une architecture de styles modulable et maintenable)
