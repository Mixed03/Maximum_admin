import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Size {
  size: string;
  stock: number;
}

interface MultiSizeInputProps {
  value: Size[];
  onChange: (value: Size[]) => void;
  onRemove: (index: number) => void;
}

const MultiSizeInput: React.FC<MultiSizeInputProps> = ({ value, onChange, onRemove }) => {
  const [newSize, setNewSize] = useState('');
  const [newStock, setNewStock] = useState(0);

  const handleAdd = () => {
    if (newSize && newStock > 0) {
      onChange([...value, { size: newSize, stock: newStock }]);
      setNewSize('');
      setNewStock(0);
    }
  };

  return (
    <div>
      {value.map((item, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <Input
            value={item.size}
            readOnly
            className="w-1/2"
          />
          <Input
            type="number"
            value={item.stock}
            readOnly
            className="w-1/2"
          />
          <X
            className="cursor-pointer text-red-600"
            onClick={() => onRemove(index)}
          />
        </div>
      ))}
      <div className="flex items-center gap-2">
        <Input
          value={newSize}
          onChange={(e) => setNewSize(e.target.value)}
          placeholder="Size"
          className="w-1/2"
        />
        <Input
          type="number"
          value={newStock}
          onChange={(e) => setNewStock(Number(e.target.value))}
          placeholder="Stock"
          className="w-1/2"
        />
        <Plus
          className="cursor-pointer text-green-600"
          onClick={handleAdd}
        />
      </div>
    </div>
  );
};

export default MultiSizeInput;


