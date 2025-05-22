'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Image from 'next/image'

import { FreightForm } from '@/components/freight-form'
import { Footer } from '@/components/footer'

import { api } from '@/services/api'

import { variants, productImages } from '@/utils/data'
import { Header } from '@/components/header'
export interface AddressProps {
  logradouro: string
  complemento: string
  localidade: string
  bairro: string
  uf: string
}

interface DataWithExpiryProps {
  mainImage: string
  selectedSize: string | null
  selectedColor: string | null
  cep: string
  address: AddressProps | null
}

export default function ProductPage() {
  const [mainImage, setMainImage] = useState(productImages[0])
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [cep, setCep] = useState('')
  const [address, setAddress] = useState<AddressProps | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedUserData = handleGetUserDataWithExpiry('productState')

    if (savedUserData) {
      setMainImage(savedUserData.mainImage)
      setSelectedSize(savedUserData.selectedSize)
      setSelectedColor(savedUserData.selectedColor)
      setCep(savedUserData.cep)
      setAddress(savedUserData.address)
    }
  }, [])

  useEffect(() => {
    handleSetUserDataWithExpiry('productState', {
      mainImage,
      selectedSize,
      selectedColor,
      cep,
      address,
    })
  }, [mainImage, selectedSize, selectedColor, cep, address])

  async function handleCepSearch(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault()

    if (cep.length !== 8) return

    try {
      const response = await api.get(`${cep}/json/`)

      if (response.data.erro) {
        setError('CEP informado não encontrado!')

        setAddress(null)
      } else {
        setAddress(response.data)

        setError(null)
      }
    } catch {
      setError('Erro ao buscar o CEP!')
    }
  }

  function handleSetUserDataWithExpiry(
    key: string,
    value: DataWithExpiryProps
  ) {
    const currentTime = new Date()

    const userData = {
      value,
      expiry: currentTime.getTime() + 15 * 60 * 1000,
    }

    localStorage.setItem(key, JSON.stringify(userData))
  }

  const handleGetUserDataWithExpiry = (key: string) => {
    if (typeof window === 'undefined') return null

    const userData = localStorage.getItem(key)

    if (!userData) return null

    const content = JSON.parse(userData)

    if (new Date().getTime() > content.expiry) {
      localStorage.removeItem(key)

      return null
    }

    return content.value
  }

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto h-screen place-items-center p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <Image
            src={mainImage}
            alt="Produto principal"
            width={250}
            height={250}
            className="rounded-lg object-cover size-80"
          />
          <div className="flex gap-2 mt-4">
            {productImages.map((productImage, index) => (
              <Image
                key={index}
                src={productImage}
                alt={`Miniatura ${index}`}
                width={50}
                height={50}
                className={`cursor-pointer border ${
                  mainImage === productImage
                    ? 'border-blue-500'
                    : 'border-gray-300'
                }`}
                onClick={() => setMainImage(productImage)}
              />
            ))}
          </div>
        </section>
        <section className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold">Camiseta Estilosa</h1>
            <p className="text-xl mt-1 text-gray-600 font-bold">R$ 79,90</p>
          </div>
          <div className="space-y-2">
            <h2 className="font-medium">Tamanho:</h2>
            <div className="flex gap-2">
              {variants.size.map((variant) => (
                <button
                  key={variant}
                  onClick={() => setSelectedSize(variant)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === variant
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="font-medium">Cor:</h2>
            <div className="flex gap-2">
              {variants.color.map((variant) => (
                <button
                  key={variant}
                  onClick={() => setSelectedColor(variant)}
                  className={`px-4 py-2 border rounded ${
                    selectedColor === variant
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>
          <FreightForm
            handleCepSearch={handleCepSearch}
            cep={cep}
            setCep={setCep}
            address={address}
            error={error}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}
