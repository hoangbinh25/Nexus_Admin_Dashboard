import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";

interface SearchInputProps {
    initialValue: string;
    onSearch: (value: string) => void;
}

export const SearchInput = ({ initialValue, onSearch }: SearchInputProps) => {
    const [localValue, setLocalValue] = useState(initialValue);
    const debouncedValue = useDebounce<string>(localValue, 500);

    useEffect(() => {
        setLocalValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        if (debouncedValue !== initialValue) {
            onSearch(debouncedValue);
        }
    }, [debouncedValue, initialValue, onSearch]);

    return (
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                <Search size={18} />
            </div>
            <input
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                placeholder="Tìm kiếm sản phẩm..."
            />
        </div>
    );
};