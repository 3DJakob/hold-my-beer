export interface ImageStruct {
  imageUrl: string
  fileType?: any
  size?: any
}

export interface TasteClockStruct {
  key: string
  value: number
}

export interface BeerStruct {
  id?: string
  productId: string
  productNumber: string
  productNameBold: string
  productNameThin: string
  category?: any
  productNumberShort: string
  producerName: string
  supplierName: string
  isKosher: boolean
  bottleTextShort: string
  restrictedParcelQuantity: number
  isOrganic: boolean
  isEthical: boolean
  ethicalLabel?: any
  isWebLaunch: boolean
  productLaunchDate: Date
  isCompletelyOutOfStock: boolean
  isTemporaryOutOfStock: boolean
  alcoholPercentage: number
  volumeText: string
  volume: number
  price: number
  country: string
  originLevel1?: any
  originLevel2?: any
  categoryLevel1: string
  categoryLevel2: string
  categoryLevel3: string
  categoryLevel4?: any
  customCategoryTitle: string
  assortmentText: string
  usage: string
  taste: string
  tasteSymbols: string[]
  tasteClockGroupBitter?: any
  tasteClockGroupSmokiness?: any
  tasteClockBitter: number
  tasteClockFruitacid: number
  tasteClockBody: number
  tasteClockRoughness: number
  tasteClockSweetness: number
  tasteClockSmokiness: number
  tasteClockCasque: number
  assortment: string
  recycleFee: number
  isManufacturingCountry: boolean
  isRegionalRestricted: boolean
  packaging: string
  isNews: boolean
  images: ImageStruct[]
  isDiscontinued: boolean
  isSupplierTemporaryNotAvailable: boolean
  sugarContent: number
  sugarContentGramPer100ml: number
  seal: any[]
  vintage?: any
  grapes: any[]
  otherSelections?: any
  tasteClocks: TasteClockStruct[]
  color: string
  dishPoints?: any
}

export interface BeerSimilarityStruct {
  beer: BeerStruct
  similarity: number
}
