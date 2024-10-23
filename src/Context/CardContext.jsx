import React, { createContext} from 'react';
import first from '../assets/images/SVG/dashboardgrocery.svg';
import seconed from '../assets/images/SVG/dashboardspiritualgoals.svg';
import third from '../assets/images/SVG/dashboardpersonalgromming.svg';
import fourth from '../assets/images/SVG/thingstodo.svg';
import fifth from '../assets/images/SVG/recipe.svg';

const CardContext = createContext();


export const CardProvider = ({ children }) => {
  const cardDataArray = [
    {
      title: 'Grocery List',
      description: 'Add needed items.',
      items: '200 Items',
      percentagetext: 'Bought 70%',
      percentage: 70,
      Picture: first,
      bgColor: '#9DF4F4',
      badgeColor: '#008B94',
    },
    {
      title: 'Spiritual Goals',
      description: 'Add your spiritual goals.',
      items: '10 Goals',
      percentagetext: 'Achieved 30%',
      percentage: 30,
      Picture: seconed,
      bgColor: '#98FBCB',
      badgeColor: '#4AA688',
    },
    {
      title: 'Personal Grooming',
      description: 'Add your grooming tasks in list.',
      items: '10 Tasks',
      percentagetext: 'Completed 80%',
      percentage: 80,
      Picture: third,
      bgColor: '#FEE5D7',
      badgeColor: '#C54B6C',
    },
    {
      title: 'Things To Do',
      description: 'Add needed items.',
      items: '15 Items',
      percentagetext: 'Bought 50%',
      percentage: 50,
      Picture: fourth,
      bgColor: '#FFCBA1CC',
      badgeColor: '#E36A4A',
    },
    {
      title: 'Kitchen Menu',
      description: 'Add needed items.',
      items: '500 Recipies',
      percentagetext: 'Cooked 70%',
      percentage: 70,
      Picture: fifth,
      bgColor: '#fddc8a',
      badgeColor: '#D88D1B',
    },
  ];


  return (
    <CardContext.Provider value={''}>
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;
