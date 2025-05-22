import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import axios from 'axios'

const productImages = [
  '/product1.jpg',
  '/product2.jpg',
  '/product3.jpg',
  '/product4.jpg',
]

const variants = {
  size: ['P', 'M', 'G', 'GG'],
  color: ['Preto', 'Branco', 'Azul', 'Amarelo'],
}

const saveWithExpiry = (key: string, value: any, ttlMinutes: number) => {
  const now = new Date()

  const item = {
    value,
    expiry: now.getTime() + ttlMinutes * 60 * 1000,
  }

  localStorage.setItem(key, JSON.stringify(item))
}

const loadWithExpiry = (key: string) => {
  if (typeof window === 'undefined') return null

  const itemStr = localStorage.getItem(key)

  if (!itemStr) return null

  const item = JSON.parse(itemStr)

  if (new Date().getTime() > item.expiry) {
    localStorage.removeItem(key)

    return null
  }

  return item.value
}

export default function ProductPage() {
  const [mainImage, setMainImage] = useState(productImages[0])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const saved = loadWithExpiry('productState')

    if (saved) {
      setMainImage(saved.mainImage)
      setSelectedSize(saved.selectedSize)
      setSelectedColor(saved.selectedColor)
      setCep(saved.cep)
      setAddress(saved.address)
    }
  }, [])

  useEffect(() => {
    saveWithExpiry(
      'productState',
      {
        mainImage,
        selectedSize,
        selectedColor,
        cep,
        address,
      },
      15
    )
  }, [mainImage, selectedSize, selectedColor, cep, address])

  const handleCepSearch = async () => {
    if (cep.length !== 8) return

    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

      if (res.data.erro) {
        setError('CEP não encontrado')
        setAddress(null)
      } else {
        setAddress(res.data)
        setError(null)
      }
    } catch {
      setError('Erro ao buscar o CEP')
    }
  }

  return (
    <>
      <Head>
        <title>Produto | E-commerce</title>
      </Head>
      <main className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <Image
            src={mainImage}
            alt="Produto principal"
            width={500}
            height={500}
            className="rounded-lg object-cover"
          />
          <div className="flex gap-2 mt-4">
            {productImages.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Miniatura ${idx}`}
                width={80}
                height={80}
                className={`cursor-pointer border ${
                  mainImage === img ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold">Camiseta Estilosa</h1>
            <p className="text-xl mt-1 text-green-600 font-bold">R$ 79,90</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-medium">Tamanho:</h2>
            <div className="flex gap-2">
              {variants.size.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === s
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-medium">Cor:</h2>
            <div className="flex gap-2">
              {variants.color.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 border rounded ${
                    selectedColor === c
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Calcular Frete (CEP):
            </label>
            <input
              type="text"
              maxLength={8}
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={handleCepSearch}
              placeholder="Digite o CEP"
              className="border p-2 rounded w-full"
            />
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
          </div>
        </section>
      </main>
    </>
  )
}
