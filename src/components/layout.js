// src/components/Layout.js
import React from "react"
import { Link } from "gatsby"
import Seo from "./seo"

const Layout = ({
  children,
  pageTitle,
  pageDescription,
  pagePath,
  pageImage,
  article,
}) => {
  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        pathname={pagePath}
        image={pageImage}
        article={article}
      />
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="bg-white shadow-md">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                RapidRead Blog
              </Link>
              <div className="space-x-4">
                <Link to="/" className="text-gray-600 hover:text-gray-800">
                  Home
                </Link>
                {/* <Link to="/about" className="text-gray-600 hover:text-gray-800">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-800">
                Contact
              </Link> */}
              </div>
            </div>
          </nav>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center">
              &copy; {new Date().getFullYear()} RapidRead.io. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout
