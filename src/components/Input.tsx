import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ error, ...rest }, ref) => {
  return (
    <div className="space-y-1">
      <input
        ref={ref}
        {...rest}
        className={`w-80 bg-zinc-700 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
