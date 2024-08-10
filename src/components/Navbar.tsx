import React from 'react'

function Navbar() {
  return (
<div className="navbar bg-base-100">
  <div className="flex-1">
      Easy<span className="text-[hsl(180,100%,70%)]">Biz</span>
  </div>
  <div className="flex-none">
    <button className="btn btn-accent rounded-full">
        Connect wallet
    </button>
  </div>
</div>
  )
}

export default Navbar