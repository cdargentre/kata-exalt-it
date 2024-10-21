# Projet Exalt-Kata-API

## 1. Choix et respect de la stack technique

Comme demandé dans le cadre du kata, j'ai utilisé la stack suivante pour le projet :

- **Runtime** : Node.js
  - Node.js a été choisi comme runtime JavaScript pour sa performance et sa large communauté. Il permet de construire des applications serveur rapides et scalables.

- **Framework** : Express.js
  - Express.js est un framework minimaliste pour Node.js qui facilite la gestion des routes, middlewares, et autres fonctionnalités essentielles des applications web.

- **Base de données** : MongoDB
  - MongoDB a été utilisé comme base de données NoSQL. Il est adapté pour stocker des documents dynamiques sous forme de JSON, ce qui simplifie la manipulation des données.

- **Validation** : Joi
  - Pour valider les données entrantes (requêtes), le module **Joi** a été intégré. Il permet de définir des schémas de validation et assure que les données suivent les contraintes spécifiées.

- **CORS** : cors
  - **cors** a été utilisé pour gérer les politiques d'accès et permettre aux applications frontend d'accéder aux APIs. Cela est crucial pour assurer la sécurité des échanges entre le client et le serveur.

- **Swagger** : swagger-jsdoc, swagger-ui-express
  - Swagger est utilisé pour documenter l'API de manière dynamique. Grâce à **swagger-jsdoc**, la documentation est générée à partir des annotations dans le code, et **swagger-ui-express** permet de l'exposer à travers une interface graphique.

- **Tests** : Jest
  - **Jest** a été choisi comme framework de tests pour assurer la robustesse et la qualité du code. Il facilite l'écriture de tests unitaires et d'intégration.

- **Body Parser** : body-parser
  - **body-parser** est utilisé pour traiter les données JSON et URL-encoded dans les requêtes HTTP, simplifiant ainsi la gestion des corps de requêtes.

- **Outil de développement** : Nodemon
  - **Nodemon** est utilisé pour surveiller les changements dans le code et relancer automatiquement le serveur durant le développement.

### Dépendances supplémentaires ajoutées

- **dotenv**
  - **dotenv** a été ajouté pour gérer les variables d'environnement. Il permet de stocker les configurations sensibles (comme les secrets JWT et les informations de la base de données) dans un fichier `.env` et d'éviter de les exposer dans le code.

- **jsonwebtoken**
  - **jsonwebtoken** a été utilisé pour gérer l'authentification et la gestion des tokens JWT. Ce module est essentiel pour sécuriser les routes et protéger l'accès aux ressources sensibles.

- **supertest**
  - **supertest** a été ajouté pour faciliter les tests des routes HTTP. Il permet d'écrire des tests d'intégration en simulant des requêtes HTTP et en vérifiant les réponses du serveur.

- **swagger-jsdoc**
  - **swagger-jsdoc** a été ajouté pour générer automatiquement la documentation Swagger à partir des commentaires dans le code. Cela simplifie la gestion de la documentation et assure que celle-ci reste à jour avec le code.

### Technologies que j'aurais pu rajouter mais que j'ai évité pour respecter le stack demandé

Bien que certaines technologies supplémentaires auraient pu simplifier ou améliorer certains aspects du projet, j'ai choisi de ne pas les inclure pour respecter strictement la stack technique demandée dans le kata.

- **TypeScript** :
  - **TypeScript** aurait pu être utilisé pour ajouter des types statiques à JavaScript, ce qui améliore la robustesse et la maintenabilité du code, en particulier pour les projets de grande taille. Il aurait facilité la détection d'erreurs potentielles avant l'exécution et amélioré l'autocomplétion dans les éditeurs de code.
  - Cependant, le kata demandait spécifiquement l'utilisation de JavaScript, c'est pourquoi j'ai choisi de ne pas intégrer TypeScript afin de rester conforme aux exigences initiales.

- **Mongoose** :
  - **Mongoose** est une bibliothèque qui aurait facilité l'interaction avec MongoDB en ajoutant un niveau d'abstraction via des schémas et des modèles pour les données. Cela permet une validation automatique des données et une gestion plus simple des relations complexes.
  - Toutefois, pour coller aux exigences du kata qui ne mentionnaient pas l'utilisation de Mongoose, j'ai préféré interagir directement avec MongoDB en utilisant le client natif de MongoDB pour garder le projet plus simple et conforme.

- **NestJS** :
  - **NestJS** est un framework sur-Express basé sur TypeScript qui offre une structure modulaire, une gestion des dépendances intégrée, et des fonctionnalités avancées pour le développement d'API, comme la gestion des WebSockets, des microservices, et plus encore.
  - Bien qu'il aurait été possible de migrer le projet vers **NestJS** pour profiter de ces fonctionnalités, cela aurait dévié de la stack demandée, qui reposait sur Express.js pour sa simplicité et sa flexibilité.

## 2. Choix de l'architecture hexagonale

J'ai opté pour l'architecture hexagonale dans ce projet pour structurer l'application de manière claire et maintenir un code propre, évolutif et flexible. Cette architecture est particulièrement bien adaptée lorsqu'il s'agit de respecter des exigences techniques strictes tout en appliquant des meilleures pratiques d'industrialisation. Cela facilite le déploiement, la sécurité et la qualité du code. Voici les principales raisons de ce choix :

### a Découplage entre la logique métier et les infrastructures

L'architecture hexagonale, aussi appelée "Architecture Ports and Adapters", sépare clairement la logique métier (le "cœur" de l'application) des infrastructures techniques (comme les bases de données, frameworks ou API externes). Grâce à ce découplage, la logique métier reste inchangée même si des technologies externes évoluent ou sont remplacées. Par exemple, si l'on décide de migrer de MongoDB vers une autre base de données, ou si un nouveau framework est utilisé, cela n'impacte pas le code métier. Cela permet une plus grande flexibilité et réduit la dette technique au fil du temps.

### b) Modularité et testabilité

En structurant l'application en plusieurs couches indépendantes, chaque composant (les services métiers, les entités, les adaptateurs externes) peut être testé de manière isolée. Cela facilite l'écriture de tests unitaires robustes et précis, garantissant ainsi une meilleure couverture de tests et une qualité de code plus élevée. Par exemple, les services métiers peuvent être testés sans avoir à se soucier des interactions avec la base de données ou d'autres infrastructures. Cela répond à la consigne de "mettre en place des best-practices d'industrialisation", car des tests unitaires et de bout en bout de qualité améliorent la maintenabilité du projet.

### c) Conformité avec la stack technique donnée

L'architecture hexagonale permet également de respecter la stack technique demandée tout en garantissant une structure maintenable. L'application a été développée en Node.js avec Express.js et MongoDB, en respectant les bonnes pratiques de validation des données (via Joi), de documentation (via Swagger), et de tests (avec Jest). Grâce à l'architecture hexagonale, il est simple d'intégrer ces outils tout en maintenant le code indépendant de ces choix techniques.

### d) Meilleures pratiques d'industrialisation

L'adoption de l'architecture hexagonale permet également d'intégrer des meilleures pratiques d'industrialisation comme l'utilisation de **middlewares** pour la sécurité (authentification avec JWT), la validation des données (via Joi), et une séparation claire des responsabilités dans le code. Cela facilite l'intégration de pipelines CI/CD pour automatiser le déploiement, le test, et la mise à disposition de l'application, tout en renforçant sa sécurité et sa stabilité. En outre, en structurant bien le code, nous facilitons son évolution future (ajout de nouvelles fonctionnalités, mise à jour de dépendances, etc.) sans compromettre l'intégrité du projet.

Cette approche permet donc de répondre à la consigne de "mettre en place des best-practice d'industrialisation pour faciliter la mise à disposition de l'application, assurer sa sécurité & la qualité du code rendu", tout en assurant la scalabilité de l'application dans le temps.

## 3. Choix des améliorations apportées

Dans le cadre de ce projet, plusieurs améliorations ont été mises en place pour répondre aux exigences de sécurité, de tests et de documentation. Voici un aperçu des améliorations que j'ai réalisées :

### Sécurité

- **Ajout d'un endpoint pour générer un token d'accès** : J'ai implémenté un endpoint d'authentification qui permet aux utilisateurs de se connecter et de recevoir un token JWT. Ce token est nécessaire pour accéder aux routes protégées de l'application.
  
- **Protection des routes derrière le token d'accès** : Toutes les routes de l'application sont protégées par un middleware d'authentification qui vérifie la validité du token JWT. Cela assure que seuls les utilisateurs authentifiés peuvent accéder aux fonctionnalités.

- **Accès des Pass uniquement par leur User** : Bien que cela ait été proposé, je n'ai pas pu implémenter cette fonctionnalité en raison de contraintes de temps. L'objectif était de s'assurer qu'un Pass ne puisse être consulté que par l'utilisateur qui l'a créé. Cette amélioration nécessite une vérification supplémentaire lors de la récupération des Pass.

### Tests

- **Couverture de test Jest** : J'ai intégré Jest pour effectuer des tests unitaires et d'intégration sur les différentes parties de l'application. Je me suis concentré sur la partie User.

- **Lancement de la test-suite via un script npm** : J'ai ajouté un script npm pour exécuter facilement la suite de tests. Cela facilite le processus de test pour les développeurs, permettant de s'assurer rapidement que le code est toujours fonctionnel après des changements.

### Documentation / Interface

- **Spécification des routes en format Swagger** : J'ai documenté toutes les routes de l'API en utilisant Swagger. Cela permet de fournir une description claire des endpoints, des paramètres requis et des réponses attendues, facilitant ainsi l'intégration avec d'autres systèmes.

- **Ajout d'un front Swagger pour faciliter le testing manuel des routes** : En utilisant Swagger UI, j'ai créé une interface utilisateur permettant de tester manuellement les endpoints de l'API. Cela rend le processus de test plus interactif et accessible, permettant aux développeurs et aux testeurs de valider facilement le fonctionnement de l'API.

### Fullstack

- **Création d'un frontend** : Bien que le développement d'un frontend complet ait été proposé, je n'ai pas pu le réaliser dans ce projet. J'ai préféré me concentrer sur la création d'une API solide et bien documentée, car cela constitue le fondement d'une application fonctionnelle. La documentation Swagger fournit une première interface utilisateur pour interagir avec l'API, mais je reconnais que la création d'un frontend dédié aurait amélioré l'expérience utilisateur. L'orientation sur le backend m'a permis d'assurer une base solide sur laquelle un futur frontend pourrait s'appuyer.
