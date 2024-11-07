# Universal Market Project:
Supermarché virtuel immersif. L'objectif étant principalement de reproduire l'expérience familière d'un supermarché physique tout en exploitant les avantages du monde virtuel pour offrir une expérience utilisateur optimale.



## CONVERSATION AVEC L'AGENT GEMNI "Assistant Brainstorming":
https://gemini.google.com/gem/brainstormer/715c3abb2a273d53



### TEMPLATE DE STARTING PROMPT: 1st trial (**NB: value to update**)
- Je souhaite construire une startup portant sur le sujet: "online supermarket".
L'objectif est d'immerger l'utilisateur dans un super marché, dont nous sommes déjà tous familiarisé avec.
Je ne sais pas comment je devrais m'y prendre pour un tel projet immersif, je sais juste que je veux au moins une illusion d'étre dans un supermarché  mais virtuel, avec tous les avantages du virtuel, comme l'accès à un formulaire peu encombrant de recherche de produit, une navigation possible dans le supermaché virtuel, le fait d'avoir 2 vues principales (une dans le rayon central avec toutes les catégories, l'autre dans un rayon avec tous les produits)
Pour pouvoir le faire j'ai besoin que tu me génèrele le contenu d'un document pdf offciel pour la spécification technique de ce projet à partir de ces infos, si tu as besoin d'autres détails demande le moi stp



## ÉLÉMENTS ADDITIONNELS: 
- Il faut toujours spécifier certains points concernant le code:
    - utilise des balises sémantiques dans une perspective experte en SEO et accéssibilité
    - permettre des classes sur des composants BEM (Block Element Modifier), mais seulement sur les composants et pas sur leurs éléments. Donc utiliser nu fichier scss à part, et si utilise un outil comme tailwind, utilisé des @apply dans le scss plutot que des nom class css dans le rendu html
    - enfin, construire le contenu des composants à l'aide d'une variable de données isolé dans un fichier dédié à ce composant



