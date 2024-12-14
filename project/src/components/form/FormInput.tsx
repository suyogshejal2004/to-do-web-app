import React from 'react';
import { motion } from 'framer-motion';

interface FormInputProps {
  label: string;
  type?: 'text' | 'date' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  delay?: number;
}

export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  delay = 0
}: FormInputProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
    >
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        required={required}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </motion.div>
  );
}