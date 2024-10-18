import { fruitItems, vegetableItems, milkproducts, sauces, spices, frozenitems } from './Images';

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
      {name: 'Pulses', items: fruitItems},
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
      {name: 'Prayers', items: fruitItems},
      {name: 'Fasting', items: fruitItems},
      {name: 'Zikar & Silence', items: fruitItems},
      {name: 'Donating', items: fruitItems},
      {name: 'Meditation', items: fruitItems},
      {name: 'Being mindful', items: fruitItems},
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
      {name: 'Personal Hygiene', items: fruitItems},
      {name: 'Dental Care', items: fruitItems},
      {name: 'Skin Care', items: fruitItems},
      {name: 'Hair Care', items: fruitItems},
      {name: 'Nail Care', items: fruitItems},
      {name: 'Public Speaking', items: fruitItems},
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
      {name: 'Cleaning', items: fruitItems},
      {name: 'Laundry', items: fruitItems},
      {name: 'Drinking', items: fruitItems},
      {name: 'Eating', items: fruitItems},
      {name: 'Cooking', items: fruitItems},
      {name: 'Official Tasks', items: fruitItems},
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
      {name: 'Breakfast', items: fruitItems},
      {name: 'Brunch', items: fruitItems},
      {name: 'Salads', items: fruitItems},
      {name: 'Chicken', items: fruitItems},
      {name: 'Mutton', items: fruitItems},
      {name: 'Beef', items: fruitItems},
    ],
  },
];
