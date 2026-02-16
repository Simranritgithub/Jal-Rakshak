const InputField = ({
  label,
  name,
  type = "email",
  icon,
  value,
  onChange,
  placeholder,
}) => (
  <label className="block">
    <div className="flex items-center gap-3 mb-2">
    <span className="text-slate-400">{icon}</span>
    <span className="block text-sm font-semibold text-slate-800 mb-1 after:content-['*'] after:text-red-500 after:ml-0.5">
      {label}
    </span></div>

    {/* <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-slate-400 bg-white
                    focus-within:ring-2 focus-within:ring-[#0ABAB5]/40"> */}
      {/*  */}

      {/* peer */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="peer w-full bg-transparent text-sm text-slate-800 focus:outline-none
                   invalid:text-pink-500 border-2 border-slate-400 rounded-2xl px-4 py-3"
      />
    

    {/* direct sibling of input (within same label) */}
    <p className="invisible peer-invalid:visible text-red-500 text-sm font-semibold mt-1">
  {name === "email"
    ? "Please provide a valid email address."
    : name === "password"
    ? "Password must be at least 8 characters."
    : "Invalid input"}
</p>

  </label>
);

export default InputField;
