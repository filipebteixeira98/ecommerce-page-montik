import type { FormEvent } from 'react'

import type { AddressProps } from '@/app/page'

interface FreightFormProps {
  handleCepSearch(event: FormEvent<HTMLFormElement>): Promise<void>
  cep: string
  setCep: (value: string) => void
  error: string | null
  address: AddressProps | null
}

export function FreightForm({
  handleCepSearch,
  cep,
  setCep,
  error,
  address,
}: FreightFormProps) {
  return (
    <div>
      <label className="block font-medium mb-1">Calcular Frete (CEP):</label>
      <form onSubmit={handleCepSearch}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            maxLength={8}
            value={cep}
            onChange={(event) => setCep(event.target.value)}
            placeholder="Digite o CEP"
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-blue-300 p-2 rounded text-base text-white"
          >
            Calcular
          </button>
        </div>
        {error && <p className="text-red-500 mt-1">{error}</p>}
        {address && (
          <div className="text-sm mt-2 bg-gray-100 p-2 rounded">
            <p>
              {address.logradouro}, {address.bairro}
            </p>
            <p>
              {address.localidade} - {address.uf}
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
