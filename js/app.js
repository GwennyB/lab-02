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
  $.get('data/page-1.json','json')
    .then(data => {
      data.forEach(animal => {
        let thisAnimal = new Animal(animal);
        Animal.allAnimals.push(thisAnimal);
        // console.log('thisAnimal',thisAnimal);
        thisAnimal.makeList();
      })
    })
    .then(Animal.keyFilter)
    .then(Animal.loadAnimals)
};

Animal.loadAnimals = () => Animal.allAnimals.forEach( animal => animal.render());

Animal.prototype.render = function() {
  $('main').append('<section class="clone"></section>');
  let animalClone = $('section[class="clone"]');
  let animalHtml = $('#photo-template').html();
  animalClone.html(animalHtml);

  animalClone.find('h2').text(this.title);
  animalClone.find('img').attr('src', this.image_url);
  animalClone.find('p').text(this.description);
  animalClone.removeClass('clone');
  animalClone.attr('class', this.keyword);
}

Animal.prototype.makeList = function() {
  $('select[class="keyfilter"]').append('<option class="clone"></option>');
  $('option[class="clone"]').text(this.keyword);
  $('option[class="clone"]').val(this.keyword);
  $('option[class="clone"]').removeClass('clone');
}

Animal.keyFilter = () => {
  $('.keyfilter').on('change',function(event){
    event.preventDefault();
    console.log('inside key filter');
    Animal.clearRender();
    const chosen = [];
    let keyValue = event.target.value;
    console.log('keyvalue', keyValue);
    Animal.allAnimals.forEach(animal => {
      if(animal.keyword === keyValue){
        chosen.push(animal);
      }
    })
    chosen.forEach( animal => animal.render());
  });
};

Animal.clearRender = () => {
  $('section').hide();
};


$(() => Animal.readJson());
