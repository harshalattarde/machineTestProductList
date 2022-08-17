import React from 'react'
import { productTypeEnum } from './contant'

type SvgInHtml = HTMLElement & SVGElement

export interface productItemInterface {
	name: string
	price: number
	productType: productTypeEnum
	imported: boolean
	quantity: number
	icon: JSX.Element
}
export interface totalProductItemInterface {
	name: string
	price: number
	productType: productTypeEnum
	imported: boolean
	quantity: number
	priceIncTax?: number
	icon: JSX.Element
}
