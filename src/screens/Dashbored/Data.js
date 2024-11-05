import { Easing } from 'react-native';
import {
  azkaarItems,
  bakeryAndBreadItems,
  beveragesItems,
  breakfastAndCerealItems,
  cleaningCaddyItems,
  condimentsAndDressingsItems,
  confectioneryAndSweetsItems,
  Cooking,
  cookingOilsItems,
  dairyAlternativesItems,
  DentalCare,
  donatingItems,
  Eating,
  fastingItems,
  flourAndBakingSuppliesItems,
  frozenitems,
  fruitItems,
  grainsAndRiceItems,
  herbsItems,
  meatAndSeafoodItems,
  meditationItems,
  milkproducts,
  nutsAndSeedsItems,
  OfficialTask,
  paperProductsItems,
  pastaAndNoodlesItems,
  personalCareItems,
  PersonalHygiene,
  petFoodAndSuppliesItems,
  prayersItems,
  Pulses,
  sauces,
  SkinCare,
  snacksItems,
  spices,
  ToDoDrinking,
  ToDoLaundry,
  vegetableItems
} from './Images';

export const categories = [
  {
    category: {
      name: 'Grocery List',
      image: 'groceryImage',
      description:
        'Scroll to the predefined articles or type them freely into the search below.',
    },
    subCategories: [
      { name: 'Bakery and Bread', items: bakeryAndBreadItems },
      { name: 'Beverages', items: beveragesItems },
      { name: 'Breakfast and Cereal', items: breakfastAndCerealItems },
      { name: 'Cleaning Caddy', items: cleaningCaddyItems },
      { name: 'Condiments and Dressings', items: condimentsAndDressingsItems },
      { name: 'Confectionery and Sweets', items: confectioneryAndSweetsItems },
      { name: 'Cooking Oils', items: cookingOilsItems },
      { name: 'Dairy Alternatives', items: dairyAlternativesItems },
      { name: 'Flour and Baking Supplies', items: flourAndBakingSuppliesItems },
      { name: 'Frozen Items', items: frozenitems },
      { name: 'Fruits', items: fruitItems },
      { name: 'Grains & Rice', items: grainsAndRiceItems },
      { name: 'Herbs', items: herbsItems },
      { name: 'Meat & Seafood', items: meatAndSeafoodItems },
      { name: 'Milk Products', items: milkproducts },
      { name: 'Nuts and Seeds', items: nutsAndSeedsItems },
      { name: 'Paper Products', items: paperProductsItems },
      { name: 'Pasta & Noodles', items: pastaAndNoodlesItems },
      { name: 'Personal Care', items: personalCareItems },
      { name: 'Pet Food and Supplies', items: petFoodAndSuppliesItems },
      { name: 'Pulses', items: Pulses },
      { name: 'Sauces', items: sauces },
      { name: 'Snacks', items: snacksItems },
      { name: 'Spices', items: spices },
      { name: 'Vegetables', items: vegetableItems },
    ],
    
  },
  {
    category: {
      name: 'Spiritual Goals',
      image: 'spiritualImage',
      description:
        'Scroll to the predefined articles or type them freely into the search below.',
    },
    subCategories: [
      {name: 'Prayers', items: prayersItems},
      {name: 'Fasting', items: fastingItems},
      {name: 'Donating', items: donatingItems},
      {name: 'Meditation', items: meditationItems},
      {name: 'Azkaar', items: azkaarItems},
    ],
  },
  {
    category: {
      name: 'Personal Grooming',
      image: 'personalGroomingImage',
      description:
        'Scroll to the predefined articles or type them freely into the search below.',
    },
    subCategories: [
      {name: 'Personal Hygiene', items: PersonalHygiene},
      {name: 'Dental Care', items: DentalCare},
      {name: 'Skin Care', items: SkinCare},
      {name: 'Hair Care', items: frozenitems},
      {name: 'Nail Care', items: frozenitems},
      {name: 'Public Speaking', items: frozenitems},
    ],
  },
  {
    category: {
      name: 'Things To Do',
      image: 'thingsToDoImage',
      description:
        'Scroll to the predefined articles or type them freely into the search below.',
    },
    subCategories: [
      {name: 'Cleaning', items: cleaningCaddyItems},
      {name: 'Laundry', items: ToDoLaundry},
      {name: 'Drinking', items: ToDoDrinking},
      {name: 'Eating', items: Eating},
      {name: 'Cooking', items: Cooking},
      {name: 'Official Tasks', items: OfficialTask},
    ],
  },
  {
    category: {
      name: 'Kitchen Menu',
      image: 'kitchenMenuImage',
      description:
        'Scroll to the predefined articles or type them freely into the search below.',
    },
    subCategories: [
      {name: 'Breakfast', items: frozenitems},
      {name: 'Brunch', items: frozenitems},
      {name: 'Salads', items: frozenitems},
      {name: 'Chicken', items: frozenitems},
      {name: 'Mutton', items: frozenitems},
      {name: 'Beef', items: frozenitems},
    ],
  },
];
