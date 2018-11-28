'use strict';

function Animal(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}

Animal.allAnimals = [];

Animal.readJson = () => {
  $.get('page_1.json','json')
    .then(data => {
      data.forEach(animal => {
        Animal.allAnimals.push(new Animal(animal))
      })
    })
    .then(Animal.loadAnimals)
};

