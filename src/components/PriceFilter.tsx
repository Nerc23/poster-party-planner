
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PriceFilterProps {
  maxPrice: number;
  onChangePrice: (value: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ maxPrice, onChangePrice }) => {
  // Function to get gradient colors based on price
  const getSliderBackground = () => {
    const percentage = (maxPrice / 150) * 100;
    return `linear-gradient(to right, #8B5CF6 0%, #D946EF ${percentage}%, #e5e7eb ${percentage}%)`;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <Label htmlFor="price" className="text-sm font-medium flex items-center">
          <span className="mr-2">Max Price:</span>
          <span className="text-event-purple font-bold bg-event-softPurple px-2 py-0.5 rounded">
            R{maxPrice}
          </span>
        </Label>
        {maxPrice >= 150 && (
          <span className="text-xs text-gray-500">R150+</span>
        )}
      </div>
      <Slider
        id="price"
        max={150}
        step={10}
        value={[maxPrice]}
        onValueChange={(values) => onChangePrice(values[0])}
        className="w-full"
        style={{
          '--slider-track-background': getSliderBackground(),
        } as React.CSSProperties}
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Free</span>
        <span className="text-xs bg-event-softPurple text-event-purple px-2 py-0.5 rounded-full">R150+</span>
      </div>
    </div>
  );
};

export default PriceFilter;
