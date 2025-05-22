import { motion } from 'framer-motion'
import { ShieldCheck, Truck, RefreshCcw } from 'lucide-react'

export function ProductAction() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col p-8 border-b border-gray-300"
    >
      <p className="text-sm text-gray-600 mb-6">em 12x de R$ 6,66 sem juros</p>
      <button className="bg-blue-600 text-white text-base font-medium py-3 px-6 rounded hover:bg-blue-700 transition mb-3">
        Comprar agora
      </button>
      <button className="text-blue-600 border border-blue-600 text-base font-medium py-3 px-6 rounded hover:bg-blue-50 transition">
        Adicionar ao carrinho
      </button>
      <ul className="mt-6 space-y-3 text-sm text-gray-700">
        <li className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-gray-500" />
          Frete grátis para todo o Brasil
        </li>
        <li className="flex items-center gap-2">
          <RefreshCcw className="w-5 h-5 text-gray-500" />
          Devolução grátis
        </li>
        <li className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-gray-500" />
          Compra garantida pelo Mercado Pago
        </li>
      </ul>
    </motion.div>
  )
}
