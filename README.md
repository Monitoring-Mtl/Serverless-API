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
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">Placeholder 1</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Placeholder 2</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Placeholder 3</a>
  </p>
</div>



<!-- TABLE DES MATIÈRES -->
<details>
  <summary>Table des matières</summary>
  <ol>
    <li>
      <a href="#about-the-project">A propos du projet</a>
      <ul>
        <li><a href="#built-with">Construit avec</a></li>
      </ul>
    </li>
    <li>
      <a href="#pour-debuter">Pour débuter</a>
      <ul>
        <li><a href="#prerequis">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#utilisations">Utilisations</a></li>
    <li><a href="#plan">Plan de développement</a></li>
    <li><a href="#contribuer">Contribuer</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#reconnaissance">Reconnaissances</a></li>
  </ol>
</details>



<!-- A PROPOS DU PROJET -->
## A propos du project
<div align="center">
  <a href="https://www.etsmtl.ca/">
    <img src="https://github.com/Monitoring-Mtl/Serverless-API/assets/113111772/f4646e57-50f7-4394-a698-2e81f886870e" alt="Logo" width="200" height="200">
  </a>
</div>

There are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:
* Your time should be focused on creating something amazing. A project that solves a problem and helps others
* You shouldn't be doing the same tasks over and over like creating a README from scratch
* You should implement DRY principles to the rest of your life :smile:

Of course, no one template will serve all projects since your needs may be different. So I'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all the people have contributed to expanding this template!

<p align="right">(<a href="#readme-top">haut</a>)</p>



### Construit Avec

Voici la liste des frameworks et des outils que nous utilisons dans le projet : 

* [![NodeJS][NodeJS]][NodeJS-url]
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
4. Creer un .ENV et sauvegarder les clés API dans le `.env`
   ```.env
    API_URL=https://api.stm.info/pub/od/gtfs-rt/ic/v2/vehiclePositions
    API_KEY=VOTRE_CLE_API
   ```
5. Lancer le serverless local
   ```sh
     npm run offline
   ```

<p align="right">(<a href="#readme-top">haut</a>)</p>



<!-- EXAMPLES D'UTILISATION -->
## Utilisation

Tbd.

_Pour plus d'exemples, référez-vous à [Documentation](https://github.com/Monitoring-Mtl/Serverless-API/wiki)_

<p align="right">(<a href="#readme-top">haut</a>)</p>



<!-- PLAN -->
## Plan de Développement

- [ ] Ajouter les endpoints nécessaires
- [ ] Ajuster et automatiser le Pipeline
- [ ] Collection des données
- [ ] Faire la documentations

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

Francis Bordeleau- [@linkedin](https://www.linkedin.com/in/francis-bordeleau-b2aa273/)

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

#Decision Relative a GitHub

Expliquer pourquoi nous avons choisis le trunk-based development.

#Structure des branches

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

