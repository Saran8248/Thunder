import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-extrabold text-orange-500">Thunder <span className="text-slate-800">Food</span></span>
          </Link>
        </div>
        <div className="flex gap-x-8">
          <div className="hidden lg:flex lg:gap-x-8">
            <Link href="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-500 transition">
              Home
            </Link>
            <Link href="/restaurants" className="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-500 transition">
              Restaurants
            </Link>
            <Link href="/offers" className="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-500 transition">
              Offers
            </Link>
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-4 items-center">
          <Link href="/cart" className="text-sm font-semibold leading-6 text-gray-900">
            <div className="relative hover:text-orange-500 transition cursor-pointer">
               Cart (0)
            </div>
          </Link>
          <Link href="/login" className="text-sm font-semibold leading-6 text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
