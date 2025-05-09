
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PriceFilterProps {
  maxPrice: number;
  onChangePrice: (value: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ maxPrice, onChangePrice }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <Label htmlFor="price" className="text-sm font-medium">
          Max Price: ${maxPrice}
        </Label>
        {maxPrice >= 150 && (
          <span className="text-xs text-gray-500">$150+</span>
        )}
      </div>
      <Slider
        id="price"
        max={150}
        step={10}
        value={[maxPrice]}
        onValueChange={(values) => onChangePrice(values[0])}
        className="w-full"
      />
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>Free</span>
        <span>$150+</span>
      </div>
    </div>
  );
};

export default PriceFilter;
