import * as d3 from 'd3'
import { useEffect, useState } from 'react'
// @ts-expect-error
import data from './utils/beers.csv'
import { BeerStruct } from './utils/typings'
// @ts-expect-error
import { Corpus } from 'tiny-tfidf'
import stopwords from 'stopwords-sv'
import SquareLoader from 'react-spinners/SquareLoader'
const allBeers: BeerStruct[] = []

const loadBeers = async (): Promise<string[]> => {
  const beers: string[] = []
  // @ts-expect-error
  await d3.csv(data, function (data: BeerStruct) {
    allBeers.push(data)
    const properties = [
      data.productNameBold,
      data.productNameThin,
      data.categoryLevel1,
      data.categoryLevel2,
      data.categoryLevel3,
      data.categoryLevel4,
      data.usage,
      data.taste
    ]
    beers.push(properties.join(' '))
  })
  return beers
}

const App: React.FC = () => {
  const [corpus, setCorpus] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<BeerStruct[]>([])

  const createCorpus = async (): Promise<void> => {
    const beers = await loadBeers()
    const documentTitles = beers.map((beer, i) => i.toString())

    const corpus = new Corpus(
      documentTitles,
      beers,
      false,
      stopwords
    )
    setCorpus(corpus)
    corpus.getResultsForQuery('ale')
    setLoading(false)
  }

  useEffect(() => {
    createCorpus().catch(() => console.log('error loading corpus!'))
  }, [])

  const handleInput = (e: any): void => {
    console.log('input started')
    if (corpus != null) {
      console.log('corpus not null')
      const result: Array<Array<string|number>> = corpus.getResultsForQuery(e.target.value).slice(0, 10)
      // console.log('done similarity')
      // console.log(result.map(item => corpus.getDocument(item[0])))
      // console.log(result.map(item => allBeers[Number(item[0])]))
      setResults(result.map(item => allBeers[Number(item[0])]))
    }
  }

  return (
    <div className='App'>
      <h1>Beer recommender </h1>
      {loading && (
        <>
          <SquareLoader color='black' loading size={150} />
          <p>Constructing corpus</p>
        </>
      )}
      <input onChange={handleInput} placeholder='Search for a beer!' />
      {results.map(beer => {
        return (
          <p key={beer.productId}>
            {beer.productNameThin} {beer.productNameBold}
          </p>
        )
      })}
    </div>
  )
}

export default App
