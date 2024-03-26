import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'

export default function FooterComponent() {
  return (
    <Footer container className='border-t-8 border-teal-500'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                    <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Aakash's</span>
                        Blog
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                    <div className=''>
                        <Footer.Title title='About'/>
                        <Footer.LinkGroup col>
                            <Footer.Link href='#'>
                                Aakash's Blog
                            </Footer.Link>
                            <Footer.Link href='/about'>
                                About me
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow Us'/>
                        <Footer.LinkGroup col>
                            <Footer.Link 
                                href='https://github.com'
                                target='_blank'
                                rel='noopener noreferrer'
                                >
                                GitHub
                            </Footer.Link>
                            <Footer.Link 
                                href='https://discord.com'
                                target='_blank'
                                rel='noopener noreferrer'
                                >
                                Discord
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Legal'/>
                        <Footer.LinkGroup col>
                            <Footer.Link 
                                href='#'>
                                Privacy Policy
                            </Footer.Link>
                            <Footer.Link 
                                href='#'>
                                Terms &amp; Conditions
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
                <Footer.Copyright href='#' by="Aakash's Blog" year={new Date().getFullYear()}/>
                <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                    <Footer.Icon href='https://facebook.com' icon={BsFacebook}/>
                    <Footer.Icon href='https://instagram.com' icon={BsInstagram}/>
                    <Footer.Icon href='https://twitter.com' icon={BsTwitter}/>
                </div>
            </div>
        </div>
    </Footer>
  );
}
