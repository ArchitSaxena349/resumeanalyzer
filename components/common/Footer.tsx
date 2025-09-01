import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, Heart, Shield, Zap, FileText } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-rose-500" />
                <span className="text-xl font-bold text-white">Resume Analyzer</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                AI-powered resume analysis tool that helps you optimize your resume for ATS systems and stand out to employers.
              </p>
              <div className="flex space-x-4">
                <Link href="https://github.com" className="text-slate-400 hover:text-rose-500 transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="https://twitter.com" className="text-slate-400 hover:text-rose-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="https://linkedin.com" className="text-slate-400 hover:text-rose-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="mailto:support@resumeanalyzer.com" className="text-slate-400 hover:text-rose-500 transition-colors">
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Features</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/features" className="text-slate-300 hover:text-rose-500 transition-colors flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>AI Analysis</span>
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-slate-300 hover:text-rose-500 transition-colors flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>ATS Scoring</span>
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-slate-300 hover:text-rose-500 transition-colors flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Keyword Analysis</span>
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-slate-300 hover:text-rose-500 transition-colors flex items-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Smart Suggestions</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-slate-300 hover:text-rose-500 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-300 hover:text-rose-500 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="text-slate-300 hover:text-rose-500 transition-colors">
                    Resume Templates
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-slate-300 hover:text-rose-500 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-slate-300 hover:text-rose-500 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-slate-300 hover:text-rose-500 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-300 hover:text-rose-500 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-300 hover:text-rose-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-slate-400">
              © {currentYear} Resume Analyzer. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-rose-500" />
              <span>using Next.js & AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer