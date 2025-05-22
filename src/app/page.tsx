'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Image from 'next/image'

import { Header } from '@/components/header'
import { FreightForm } from '@/components/freight-form'
import { Footer } from '@/components/footer'
import { ProductAction } from '@/components/product-action'
import { SellerInfo } from '@/components/seller-info'

import { api } from '@/services/api'

import { variants, productImages } from '@/utils/data'
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
      <main className="max-w-5xl mx-auto place-items-center p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <Image
            src={mainImage}
            alt="Produto principal"
            width={250}
            height={250}
            className="rounded-lg object-cover size-80"
          />
          <div className="flex gap-2 mt-4 mb-12">
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
          <DescriptionSection />
        </section>
        <section className="mt-10 space-y-6 md:border-l md:border-gray-200 md:pl-12">
          <div className="flex justify-end items-center py-4">
            <a href="#share" className="text-sm text-blue-500 px-1">
              Compartilhar
            </a>
            <a
              href="#sell"
              className="text-sm text-blue-500 px-1 border-l border-gray-300 ml-2 pl-2"
            >
              Vender produto igual
            </a>
          </div>
          <div>
            <h1 className="text-3xl font-semibold">Camiseta Estilosa</h1>
            <p className="text-xl mt-1 text-gray-600 font-bold">R$ 79,90</p>
          </div>
          <ProductAction
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            variants={variants}
          />
          <FreightForm
            handleCepSearch={handleCepSearch}
            cep={cep}
            setCep={setCep}
            address={address}
            error={error}
          />
          <SellerInfo />
          <WarrantySection />
        </section>
      </main>
      <Footer />
    </>
  )
}

function WarrantySection() {
  return (
    <div className="flex flex-col">
      <h4 className="text-lg mb-10">Garantia</h4>
      <div className="flex flex-col">
        <span>
          <p className="text-base text-black">
            Garantia de segurança na sua compra
          </p>
          <p className="mt-1 text-sm text-gray-600 leading-5">
            Receba o produto que você esperava ou devolva seu dinheiro
          </p>
        </span>
        <span className="mt-4">
          <p className="text-base text-black">Garantia do vendedor</p>
          <p className="mt-1 text-sm text-gray-600 leading-5">
            Sem garantia Saiba mais sobre a garantia
          </p>
        </span>
      </div>
      <a href="#learn" className="mt-5 font-semibold text-sm text-blue-500">
        Saiba mais sobre a garantia
      </a>
    </div>
  )
}

function DescriptionSection() {
  return (
    <div className="border-t border-gray-300 px-8 py-11">
      <h2 className="text-2xl mb-8">Description</h2>
      <p className="text-lg text-gray-600 leading-7">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique,
        leo quis pharetra mollis...
        <br />
        <br />
        Elementum faucibus: <br />
        - 1x Lorem ipsum <br />
        - 2x Dolor sit amet <br />
        - 5x Pharetra mollis <br />
        - 3x Nam nisl <br />
        - 4x Curabitur non erat <br />
        <br />
        Praesent magna magna, fermentum sit amet gravida eget, sodales sit amet
        justo. Mauris ultrices placerat euismod...
      </p>
    </div>
  )
}
