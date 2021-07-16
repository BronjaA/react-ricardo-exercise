# React Ricardo Exercise project

A very small version of Ricardo, developed using Ricardo's API as part of an job interview exercise.

**About the project**  
The project was developed using the React library, TypeScript and SASS CSS precompiler.  
Apart from the necessary features that were described in the exercise requirements, I've added some more, to give it a personal touch:

- Since the Home Page and the search bar were pretty plain, I've given them a **new design**, just so it's a bit nicer to look at.
- Apart from the total count and Article cards, the Search Page now hase some **filtering options** which allow the users to tailor the search results by their needs. Altough there's no sorting option, the Articles are by default sorted by their endDate, displaying the ones that are going to expire soon first.
- Once there's less than 30 minutes left until the Article expires, a **countdown** is started, displaying exactly how much minutes and seconds there's left until expiration. Upon reaching 00:00 - a label will pop up, showing that that Article is expired.
