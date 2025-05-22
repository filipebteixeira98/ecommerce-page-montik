import { CheckCircle } from 'lucide-react'

export function SellerInfo() {
  return (
    <div className="p-8 border-b border-gray-300 text-sm">
      <h3 className="text-lg font-semibold mb-4">Informações do vendedor</h3>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="font-medium text-base">Loja Exemplo Ltda.</p>
          <p className="text-gray-500 mt-1">⭐ 4.8 (1.234 avaliações)</p>
        </div>
        <a
          href="#ver-loja"
          className="text-blue-600 font-medium hover:underline"
        >
          Ver loja
        </a>
      </div>
      <div className="flex items-center gap-1 h-2 mb-4">
        <span className="flex-1 h-full bg-gray-300 rounded" />
        <span className="flex-1 h-full bg-yellow-300 rounded" />
        <span className="flex-1 h-full bg-orange-400 rounded" />
        <span className="flex-1 h-full bg-orange-600 rounded" />
        <span className="flex-1 h-full bg-green-600 rounded" />
      </div>
      <ul className="text-gray-700 space-y-1 mb-4">
        <li>⭐ Mais de 100 vendas nos últimos 60 dias</li>
        <li>📦 Entrega rápida</li>
        <li>📞 Excelente atendimento</li>
      </ul>
      <div className="flex items-center gap-2 mt-3 text-green-600 font-medium">
        <CheckCircle className="w-5 h-5" />
        MercadoLíder
      </div>
    </div>
  )
}
