const InputField = ({
  label,
  name,
  type ,
  icon,
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <label className="text-sm font-semibold text-slate-800">
      {label}
    </label>

    <div className="mt-1 flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-slate-400 bg-white focus-within:ring-2 focus-within:ring-[#0ABAB5]/40">
      <span className="text-slate-400">{icon}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full invalid:border-pink-600 invalid:text-pink-500 bg-transparent text-sm text-slate-800 focus:outline-none "
      />
    </div>
  </div>
);
export default InputField;