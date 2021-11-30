import * as d3 from 'd3'
import { useEffect, useState } from 'react'
// @ts-expect-error
import data from './utils/beers.csv'
import { BeerStruct } from './utils/typings'
// @ts-expect-error
import { Corpus } from 'tiny-tfidf'
import stopwords from 'stopwords-sv'
import SquareLoader from 'react-spinners/SquareLoader'
import Beer from './components/Beer'
// @ts-expect-error
import styled from 'styled-components'
let allBeers: BeerStruct[] = []

const beerToString = (beer: BeerStruct): string => {
  const properties = [
    beer.productNameBold,
    beer.productNameThin,
    beer.categoryLevel1,
    beer.categoryLevel2,
    beer.categoryLevel3,
    beer.categoryLevel4,
    beer.usage,
    beer.taste
  ]
  return properties.join(' ')
}

const loadBeers = async (): Promise<string[]> => {
  // @ts-expect-error
  await d3.csv(data, function (data: BeerStruct) {
    allBeers.push(data)
  })
  allBeers = removeDuplicates(allBeers)
  return allBeers.map(beer => beerToString(beer))
}
// background: rgb(217,142,81);
// background: linear-gradient(180deg, rgba(217,142,81,1) 0%, rgba(193,98,0,1) 100%);
const Container = styled.div`
  background-color: #262626;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const Text = styled.p`
  color: #fff;
`

const Title = styled.h1`
  color: #fff;
`

const SubTitle = styled.h2`
  color: #fff;
`

const Opacity = styled.div`
  opacity: 0.4;
`

const SearchBox = styled.input`
  display: flex;
  padding: 20px;
  margin: 20px;
  font-size: 16px;
  max-width: 400px;
  width: -webkit-fill-available;
  background-color: #fff;
  border-radius: 10px;
  -webkit-appearance: none;
  border:none;
  background-image:none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  box-sizing: border-box;
`

const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100vw;
  justify-content: center;
`

const removeDuplicates = (beers: BeerStruct[]): BeerStruct[] => {
  const textBeers = beers.map((beer) => JSON.stringify(beer))
  const uniq = new Set(textBeers)
  return Array.from(uniq).map(item => JSON.parse(item))
}

const App: React.FC = () => {
  const [corpus, setCorpus] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<BeerStruct[]>([])
  const [subTitle, setSubtitle] = useState('')

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

  const handleInput = (text: string): void => {
    if (corpus != null) {
      const result: Array<Array<string|number>> = corpus.getResultsForQuery(text).slice(0, 10)
      // console.log('done similarity')
      // console.log(result.map(item => corpus.getDocument(item[0])))
      // console.log(result.map(item => allBeers[Number(item[0])]))
      setResults(result.map(item => allBeers[Number(item[0])]))
    }
  }

  const findSimilar = (beer: BeerStruct): void => {
    console.log(beer)
    setSubtitle('Eftersom du gillar ' + beer.productNameBold + ' ' + beer.productNameThin)
    handleInput(beerToString(beer))
    console.log(beerToString(beer))
  }

  if (loading) {
    return (
      <Container>
        <Opacity>
          <SquareLoader color='white' loading size={30} />
        </Opacity>
        <Text>Constructing corpus</Text>
      </Container>
    )
  }

  return (
    <Container>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;700&display=swap' rel='stylesheet' />
      <Title>TF-IDF beer searcher</Title>
      <SearchBox onChange={(e: any) => handleInput(e.target.value)} placeholder='Search for a beer!' />
      <SubTitle>{subTitle}</SubTitle>
      <ResultContainer>
        {results.map(beer => <Beer beer={beer} key={beerToString(beer)} onClick={findSimilar} />)}
      </ResultContainer>
    </Container>
  )
}

export default App
