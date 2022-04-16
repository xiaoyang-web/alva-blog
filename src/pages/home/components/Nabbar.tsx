import useMedia from 'react-use/lib/useMedia'
import {
  AiOutlineSearch,
  AiOutlineCloseCircle,
  AiOutlineRight
} from 'react-icons/ai'
import { motion, useCycle } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import clsx from 'clsx'
import logo from '@/assets/logo.svg'
import { MenuToggle } from './MenuToggle'
import './Navbar.css'
import menus from './menus'

const menu = {
  open: {
    display: 'block',
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
}

const Search = () => {
  const [keywords, setKeywords] = useState('')
  const [inputActive, setInputActive] = useState(false)

  return (
    <div className={clsx('search', { 'search-active': inputActive })}>
      <div className='search-input-wrapper'>
        <input
          value={keywords}
          className='search-input'
          type='text'
          maxLength={16}
          placeholder='输入关键词进行搜索'
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          onChange={(e) => setKeywords(e.target.value)}
        />
        {keywords && (
          <button
            className='clear-button'
            onClick={() => {
              setKeywords('')
            }}
          >
            <AiOutlineCloseCircle color='#999' />
          </button>
        )}
      </div>
      <button className='search-button'>
        <AiOutlineSearch color='#999' />
      </button>
    </div>
  )
}

const Navbar = () => {
  const [menuActive, setMenuActive] = useCycle(false, true)
  const isMediumWide = useMedia('(min-width: 768px)')
  const menuRef = useRef<HTMLDivElement>(null)

  return (
    <div className='navbar-wrapper'>
      <div className='navbar'>
        <Link to='/' className='logo'>
          <img src={logo} alt='logo' />
          <span>alva-yky</span>
        </Link>
        {isMediumWide ? (
          <>
            <ul className='nav'>
              {menus.map((item, index) => (
                <li className='nav-item' key={index}>
                  <Link to={item.name}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Search />
          </>
        ) : (
          <motion.div
            className='mobile-menu-wrapper'
            initial={false}
            animate={menuActive ? 'open' : 'closed'}
          >
            <MenuToggle toggle={setMenuActive} className='mobile-menu-button' />
            <motion.div
              ref={menuRef}
              className='mobile-menu'
              variants={menu}
              onAnimationComplete={() => {
                if (!menuActive) {
                  menuRef.current?.setAttribute('style', 'display: none;')
                }
              }}
            >
              <Search />
              {menus.map((item, index) => (
                <Link className='menu-item' to={item.name} key={index}>
                  {item.icon}
                  <span className='ml-2'>{item.title}</span>
                  <AiOutlineRight className='ml-auto' color='#999' />
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Navbar
