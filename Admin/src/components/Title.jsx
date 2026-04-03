import React from 'react'

const Title = ({ text1, text2, subText }) => {
  return (
    <div className="flex flex-col gap-1.5 mb-8 group">
      <div className="flex items-center gap-3">
        {/* Accent Bar */}
        <div className="w-1.5 h-8 bg-linear-to-b from-primary-400 to-primary-600 rounded-full shadow-[0_0_15px_rgba(218,160,109,0.3)] group-hover:scale-y-110 transition-transform duration-300" />

        {/* Main Title */}
        <h2 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-2">
          <span className="text-slate-900 drop-shadow-sm">{text1}</span>
          <span className="text-primary-500 drop-shadow-sm">{text2}</span>
        </h2>

        {/* Pulse Dot */}
        <div className="h-2 w-2 bg-primary-500 rounded-full animate-pulse ml-1 opacity-50" />
      </div>

      {/* Subtext with premium styling */}
      {subText && (
        <div className="flex items-center gap-3 ml-4.5">
          <div className="h-px w-8 bg-slate-200" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">
            {subText}
          </p>
        </div>
      )}
    </div>
  )
}

export default Title
