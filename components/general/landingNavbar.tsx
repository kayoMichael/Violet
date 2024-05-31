'use client';
import { useEffect, useState } from 'react';

import { Menu as MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { Button, Drawer, Menu, Navbar } from 'react-daisyui';

const Topbar = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onWindowScroll = () => {
      setAtTop(window.scrollY < 30);
    };
    window.addEventListener('scroll', onWindowScroll);
    onWindowScroll();
  }, []);

  return (
    <>
      <div
        className={`sticky top-0 z-10 border-b bg-base-100 lg:bg-opacity-95 lg:backdrop-blur-sm ${atTop ? 'border-transparent' : 'border-base-content/10'}`}
        id='navbar-wrapper'
      >
        <div className='container'>
          <Navbar className='px-0'>
            <Navbar.Start className='gap-2'>
              <div className='flex-none lg:hidden'>
                <Drawer
                  onClickOverlay={() => {
                    setDrawerOpened(!drawerOpened);
                  }}
                  open={drawerOpened}
                  side={
                    <Menu className='min-h-full w-80 gap-2 bg-base-100 p-4 text-base-content'>
                      <Menu.Item className='font-medium'>
                        <a
                          className='text-xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text'
                          href='/'
                        >
                          VioletTrack
                        </a>
                      </Menu.Item>
                      <Menu.Item className='font-medium'>
                        <a href='#home'>Home</a>
                      </Menu.Item>
                      <Menu.Item className='font-medium'>
                        <a href='#features'>Features</a>
                      </Menu.Item>
                      <Menu.Item className='font-medium'>
                        <a href='#integrations'>Integrations</a>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button
                    color='ghost'
                    onClick={() => {
                      setDrawerOpened(true);
                    }}
                    shape='square'
                  >
                    <MenuIcon className='inline-block text-xl' />
                  </Button>
                </Drawer>
              </div>

              <a className='text-xl font-bold tracking-tighter' href='/'>
                <span className=''>VioletTrack</span>
              </a>
            </Navbar.Start>

            <Navbar.Center className='hidden lg:flex'>
              <Menu className='gap-2 px-1' horizontal size='sm'>
                <Menu.Item className='font-medium'>
                  <a href='#home'>Home</a>
                </Menu.Item>
                <Menu.Item className='font-medium'>
                  <a href='#features'>Features</a>
                </Menu.Item>
                <Menu.Item className='font-medium'>
                  <a href='#integrations'>Integrations</a>
                </Menu.Item>
              </Menu>
            </Navbar.Center>

            <Navbar.End className='gap-3'>
              <Link color='ghost' href='/auth/signup'>
                <Button color='ghost' size='sm'>
                  Register
                </Button>
              </Link>
              <Link color='ghost' href='/auth/signin'>
                <Button color='primary' size='sm'>
                  Login
                </Button>
              </Link>
            </Navbar.End>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export default Topbar;
