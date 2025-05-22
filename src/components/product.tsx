import Image from 'next/image'

import { ProductAction } from '@/components/product-action'
import { SellerInfo } from '@/components/seller-info'

export function Product() {
  return (
    <div className="flex flex-col">
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
      <div className="grid grid-cols-[65fr_35fr] bg-white shadow-md">
        <div className="border-r border-gray-300">
          <div className="flex items-center justify-center h-[530px]">
            <Image src={''} alt="T-shirt" className="h-[73%]" />
          </div>
          <Description />
        </div>
        <div>
          <ProductAction />
          <SellerInfo />
          <WarrantySection />
        </div>
      </div>
    </div>
  )
}

function WarrantySection() {
  return (
    <div className="border-t border-gray-300 p-12 flex flex-col">
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

function Description() {
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
