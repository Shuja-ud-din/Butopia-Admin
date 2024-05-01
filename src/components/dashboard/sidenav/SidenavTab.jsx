import React from 'react';
import { Link } from 'react-router-dom';
import './sidenav.css';

function SidenavTab({ imgsrc, name, active, onClick }) {
  return (
    <div className='line'>
      <Link
      //  to={`/${name.toLowerCase()}`
      // }
      className={`flex items-center gap-3 py-4 px-7 line relative ${active ? 'after:border-[2px] after:border-solid after:border-[green] after:absolute after:content-"" after:right-0 after:h-[38px] after:bottom-[4px]' : ''}`}
      onClick={onClick}
    >
        <img src={imgsrc} alt='img' width="20px" height="20px" className={` ${active ? 'text-[green]' : 'text-[#757575]'}`}/>
        <p className={` text-[16px] ${active ? 'text-[green]' : 'text-[#757575]'}`}>{name}</p>
      </Link>
    </div>
  );
}

export default SidenavTab;
