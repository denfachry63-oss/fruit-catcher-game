import React from 'react';
import { FallingItem } from '../types';
import { FruitVisual } from './FruitVisual';

interface FallingItemProps {
  item: FallingItem;
}

export const FallingItemComponent: React.FC<FallingItemProps> = ({ item }) => {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-10 will-change-transform"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
      }}
    >
      <FruitVisual type={item.type} size={item.size} rotation={item.rotation} />
    </div>
  );
};
