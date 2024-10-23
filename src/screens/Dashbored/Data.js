import {frozenitems , spices , sauces, milkproducts, vegetableItems, fruitItems } from './Images';

export const categories = [
  {
    category: {
      name: 'Grocery List',
      image: 'groceryImage',
      description:
        'Scroll to the predefined articles or type them freely into the search below.',
    },
    subCategories: [
      {name: 'Fruits', items: fruitItems},
      {name: 'Vegetables', items: vegetableItems},
      {name: 'Milk Products', items: milkproducts},
      {name: 'Frozen Items', items: frozenitems},
      {name: 'Sauces', items: sauces},
      {name: 'Pulses', items: frozenitems},
      {name: 'Spices', items: spices},
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
      {name: 'Prayers', items: frozenitems},
      {name: 'Fasting', items: frozenitems},
      {name: 'Zikar & Silence', items: frozenitems},
      {name: 'Donating', items: frozenitems},
      {name: 'Meditation', items: frozenitems},
      {name: 'Being mindful', items: frozenitems},
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
      {name: 'Personal Hygiene', items: frozenitems},
      {name: 'Dental Care', items: frozenitems},
      {name: 'Skin Care', items: frozenitems},
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
      {name: 'Cleaning', items: frozenitems},
      {name: 'Laundry', items: frozenitems},
      {name: 'Drinking', items: frozenitems},
      {name: 'Eating', items: frozenitems},
      {name: 'Cooking', items: frozenitems},
      {name: 'Official Tasks', items: frozenitems},
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
