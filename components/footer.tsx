import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">Lumina</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Modern tools for timeless missions. Helping Catholic parishes stay organized, engaged, and spiritually
              connected.
            </p>
            <p className="text-gray-400 text-sm">© 2025 Lumina. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/demo-request" className="hover:text-white transition-colors">
                  Request Demo
                </Link>
              </li>
              <li>
                <Link href="/churches" className="hover:text-white transition-colors">
                  Parish Directory
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:hello@luminaapp.org" className="hover:text-white transition-colors">
                  hello@luminaapp.org
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  (555) 123-LUMINA
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-xs opacity-75">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>Built with ❤️ for the Catholic Church</p>
        </div>
      </div>
    </footer>
  )
}
