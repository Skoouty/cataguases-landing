import React from 'react';

export default function FormField({ 
  label, 
  name, 
  register, 
  error, 
  required = false, 
  placeholder = '', 
  type = 'text', 
  value, 
  disabled = false, 
  helpText = '',
  onChangeContext
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-zinc-900">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        disabled={disabled}
        {...register(name, {
          onChange: onChangeContext
        })}
        className={`w-full rounded-2xl border px-4 py-3 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:ring-4 disabled:bg-zinc-100 disabled:text-zinc-500 ${
          error ? 'border-red-500 focus:border-red-500 ring-4 ring-red-100 bg-red-50' : 'border-zinc-300 bg-white focus:border-emerald-500 focus:ring-emerald-100'
        }`}
      />
      {helpText && !error && <span className="mt-2 block text-xs text-zinc-500">{helpText}</span>}
      {error && <span className="mt-2 block text-xs font-semibold text-red-600">{error.message}</span>}
    </label>
  );
}
