import russia from "../data/rus_regions_2.json";

 //выбираю названия регионов из файла
 const regions = [];
 for (var i = 0; i < russia.features.length; i++) {
   regions.push(russia.features[i].properties.UNIVERSAL);
 }

 function shuffleArray(array) {
   for (var i = array.length - 1; i > 0; i--) {
     var j = Math.floor(Math.random() * (i + 1));
     var temp = array[i];
     array[i] = array[j];
     array[j] = temp;
   }
   return array;
 }

export const selectedRegions = shuffleArray(regions).slice(0, 10);


