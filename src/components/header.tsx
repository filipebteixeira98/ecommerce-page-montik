import { ShoppingCart } from 'lucide-react'

export function Header() {
  return (
    <div className="w-full h-12 bg-yellow-300 border-b border-gray-100 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <ShoppingCart className="size-5" />
        <span className="text-base uppercase">Free Market</span>
      </div>
    </div>
  )
}
