<!-- Improved compatibility of haut link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- SHIELDS PROJET -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<div align="center">

  <a href="">![GitHub contributors](https://img.shields.io/github/contributors/Monitoring-Mtl/Serverless-API?color=green)</a>
  <a href="">![GitHub last commit (branch)](https://img.shields.io/github/last-commit/Monitoring-Mtl/Serverless-Api/master)</a>
  <a href="">![GitHub issues](https://img.shields.io/github/issues/Monitoring-Mtl/Serverless-API)</a>
  <a href="">![GitHub top language](https://img.shields.io/github/languages/top/Monitoring-Mtl/Serverless-Api)</a>

</div>
<!-- [![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->




<!-- LOGO ETS -->
<br />
<div align="center">
  <a href="https://www.etsmtl.ca/">
    <img src="https://www.etsmtl.ca/getmedia/a38cc621-8248-453b-a24e-ff22bd68ada5/Logo_ETS_SansTypo_FR" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">Monitoring Mtl - Serverless API</h3>

  <p align="center">
    Projet de fin d'etude - Automne 2023 - ETS Montreal
    <br />
    <a href="https://github.com/Monitoring-Mtl/Serverless-API/wiki"><strong>Explorer la documentation »</strong></a>
  </p>
</div>



<!-- TABLE DES MATIÈRES -->
<details>
  <summary>Table des matières</summary>
  <ol>
    <li>
      <a href="#a-propos-du-projet">A propos du projet</a>
      <ul>
        <li><a href="#construit-avec">Construit avec</a></li>
      </ul>
    </li>
    <li>
      <a href="#pour-débuter">Pour débuter</a>
      <ul>
        <li><a href="#prérequis">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#utilisation">Utilisations</a></li>
      <ul>
        <li><a href="#rapport-de-couverture-de-tests">Rapport de couverture de tests</a></li>
      </ul>
    <li><a href="#plan-de-développement">Plan de développement</a></li>
    <li><a href="#contribuer">Contribuer</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#reconnaissances">Reconnaissances</a></li>
  </ol>
</details>



<!-- A PROPOS DU PROJET -->
## A propos du project
</br>
<div align="center">
  <a href="https://www.etsmtl.ca/">
    <img src="https://github.com/Monitoring-Mtl/Serverless-API/assets/113111772/f4646e57-50f7-4394-a698-2e81f886870e" alt="Logo" width="200" height="200">
  </a>
</div>
</br>

Dans le contexte des villes intelligentes, des systèmes de transport intelligents, et de la mobilité
durable, le développement de solutions logicielles permettant de mieux comprendre l'impact de divers
facteurs (par exemple, les incidents routiers, la construction et la météo) sur la circulation devient un
élément essentiel de la gestion du trafic routier. L’émergence récente des données ouvertes, comme
celles fournies par la Ville de Montréal et la STM, permet maintenant de développer divers types de
solutions/applications logicielles qui contribuent à l’amélioration de la qualité de vie dans les villes.

</br>

Le but de cette application:
* Développer une application infonuagique qui collect des données (en temps réels)
* Analyser les données recueillient
* Construire une interface pour visualiser les données analyser

</br>

  _**Les fonctionnalités mentionnées ci-dessus sont à titre d'exemple pour clarifier l'objectif de chaque
composant (micro-service)_

<p align="right">(<a href="#readme-top">haut</a>)</p>

### Construit Avec

Voici la liste des frameworks et des outils que nous utilisons dans le projet : 

* [![NodeJS][NodeJS]][NodeJS-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![AWS][AWS]][AWS-url]
* [![GitHub][GitHub]][GitHub-url]
* [![GitHubActions][GitHubActions]][GitHubActions-url]
* [![AmazonDynamoDB][AmazonDynamoDB]][AmazonDynamoDB-url]
* [![ExpressJS][Express.js]][Express.js-url]
* [![EsLint][ESLint]][ESLint-url]
* [![NPM][NPM]][NPM-url]

<p align="right">(<a href="#readme-top">haut</a>)</p>



<!-- POUR DÉBUTER -->
## Pour Débuter

Voici la procédure à suivre pour installer et lancer le projet. IMPORTANT ! si vous n'avez pas NodeJS / NPM [cliquez-ici](https://nodejs.org/en)

### Prérequis

Pour mettre a jour votre version de npm à la plus récente
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Vous trouverez ci-bas un exemple de la procédure pour installer le projet localement, ainsi que lancer le projet pour tester que votre environnement de travail est fonctionnel._

1. Obtenir une clé d'API gratuite de la STM a [Stm Portail Développeur](https://portail.developpeurs.stm.info/apihub/?_gl=1*15e9526*_ga*MTUwNTUwMzAzMi4xNjk1MDU5MDA1*_ga_37MDMXFX83*MTY5NjM0NDc3MC4xMi4wLjE2OTYzNDQ3NzAuNjAuMC4w#/login)
2. Cloner le repertoire
   ```sh
   git clone https://github.com/Monitoring-Mtl/Serverless-API.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Configurer les identifiants AWS
   ```sh
   export AWS_ACCESS_KEY_ID=<access-key-id> AWS_SECRET_ACCESS_KEY=<secret-access-key>
   ```
5. Lancer le serverless local
   ```sh
   npm run offline
   ```

<p align="right">(<a href="#readme-top">haut</a>)</p>



<!-- EXAMPLES D'UTILISATION -->
## Utilisation

Pour utiliser les endpoints de l'application visiter [swagger](https://swagger.monitoring-mtl.info/) </br>
Pour contribuer ou mettre a jour la documentation Swagger, voir ce [repertoire](https://github.com/Monitoring-Mtl/Swagger-github-pages)

### Rapport de couverture de tests
Pour visualier le rapport de couverture de tests et ses résultats, visiter : [coverage-report](https://monitoring-mtl.github.io/Serverless-API/)

_Pour plus d'informations, référez-vous à la [Documentation](https://github.com/Monitoring-Mtl/Serverless-API/wiki)_
<p align="right">(<a href="#readme-top">haut</a>)</p>



<!-- PLAN -->
## Plan de Développement

- [x] Ajouter les endpoints nécessaires
- [x] Ajuster et automatiser le Pipeline
- [x] Collection des données
- [ ] Faire la documentations
- [ ] Ajouter middlewares

Voir les [issues](https://github.com/Monitoring-Mtl/Serverless-API/issues) pour voir les Features (et issues connuent).

<p align="right">(<a href="#readme-top">haut</a>)</p>



<!-- CONTRIBUER -->
## Contribuer

En esperant que le projet continue de croître grâce a vos contributions. **Merci**

Nous avons décider d'utiliser une structure de Trunk base pour la gestion des branches. Il est donc suggérer de toujours faire une branche a partir de master en suivant la procédure suivante :

1. Cloner le Project (_si ce n'est pas déjà fait_)
2. Creer un branche Feature ou Documentation (`git checkout -b feature/AmazingFeature`)
3. Commit vos Changements (`git commit -m 'ajout d'une AmazingFeature'`)
4. Pousser la Branch (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request et associer votre issue à la PR.

<p align="right">(<a href="#readme-top">haut</a>)</p>

<!-- CONTACT -->
## Contact

- Francis Bordeleau - [@linkedin](https://www.linkedin.com/in/francis-bordeleau-b2aa273/)
- Julien Gascon-Samson - [@linkedin](https://www.linkedin.com/in/julien-gascon-samson-4585b11a/)
- Mohammed Sayagh - [@linkedin](https://www.linkedin.com/in/mohammed-sayagh-24bab978/)

### Étudiants

- Pierre Amar Abdelli - [@linkedin](https://www.linkedin.com/in/pabdelli/)
- Alexandre Bouillon - [@linkedin](https://www.linkedin.com/in/alexandre-bouillon-4b67ba128/)
- Philippe Lamy - [@linkedin](https://www.linkedin.com/in/philippe-lamy-86717a276/)
- Simon St-Pierre - [@linkedin](https://www.linkedin.com/in/simon-st-pierre-9a2a7b19b/)

<p align="right">(<a href="#readme-top">haut</a>)</p>



<!-- RECONNAISSANCES -->
## Reconnaissances

Remerciements à 

  * [AWS - Academy](https://aws.amazon.com/)
  * [FX Innovation - Cloud Campus](https://www.fxinnovation.com/cloud-campus/)
  * [Badges](https://github.com/Ileriayo/markdown-badges#markdown-badges)
  * [Readme Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">haut</a>)</p>

<!-- A RAJOUTER DANS LE DOCUMENT

Données Ouverte iBUS - App
API Key : l7cb798b78334c48b2b6e4bd9513a221e9

#Decision Relative a GitHub // Pas dans readme

Expliquer pourquoi nous avons choisis le trunk-based development.

#Structure des branches // Faire wiki 

Les branches doivent etre nommber avec le numero de issue generer dans le kanban. Doive etre associer a un pull request documenter. -->


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/Monitoring-Mtl/Serverless-API/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[NodeJS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[AWS]: https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white
[AWS-url]: https://aws.amazon.com/
[GitHub]: https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white
[GitHub-url]: https://www.github.com
[GitHubActions]: https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white
[GitHubActions-url]: https://github.com/features/actions
[AmazonDynamoDB]: https://img.shields.io/badge/Amazon%20DynamoDB-4053D6?style=for-the-badge&logo=Amazon%20DynamoDB&logoColor=white
[AmazonDynamoDB-url]: https://aws.amazon.com/dynamodb/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express.js-url]: https://expressjs.com/
[ESLint]: https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[NPM]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com/

