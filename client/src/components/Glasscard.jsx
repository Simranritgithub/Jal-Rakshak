const Glasscard=({children,className=""})=>{
  return(
    <div className={`bg-white/50 border border-white/40 backdrop-blur-lg 
    shadow-[0_18px_35px_-15px_rgba(0,0,0,0.15)] rounded-3xl transition-all duration-300 hover:bg-white/90 ${className}`}>
      {children}
    </div>
  )
}
export default Glasscard;