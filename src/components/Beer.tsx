import React from 'react'
// @ts-expect-error
import styled from 'styled-components'
import { BeerSimilarityStruct, BeerStruct } from '../utils/typings'
import Tag from './Tag'
import { ReactComponent as Banner } from './banner.svg'
import Card from './Card'

export interface BeerProps {
  beerData: BeerSimilarityStruct
  onClick: (beer: BeerStruct) => void
}

const Container = styled.div`
  margin: 30px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 26px;
  justify-content: space-around;
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const Title = styled.p`
  color: #fff;
  font-size: 26px;
  font-weight: bolder;
  margin: 0;
`

const Subtitle = styled.div`
  color: #fff;
  font-size: 16px;
  margin: 0;
`

const ThinTitle = styled.div`
  color: #fff;
  font-size: 16px;
  margin: 0;
  font-weight: thin;
`

const Tags = styled.div`
  display: flex;
  flex-direction: row;
`

const Description = styled.div`
  color: #fff;
  width: 100%;
`

const Buy = styled.a`
  border-radius: 50px;
  background-color: #10B65C;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  display: flex;
  align-self: flex-start;
  transition: 200ms;
  margin-bottom: 10px;

  :hover {
    background-color: #27CA6B;
  }
`

const placeHolderImage = 'https://cdn.systembolaget.se/492c4d/contentassets/ef797556881d4e20b334529d96b975a2/placeholder-wine-bottle.png'

const Beer: React.FC<BeerProps> = ({ beerData, onClick }) => {
  const beer = beerData.beer
  const imageURL = 'https://product-cdn.systembolaget.se/productimages/' + beer.productId + '/' + beer.productId + '_400.png'
  const isGreatMatch = beerData.similarity > 23
  const url = 'https://www.systembolaget.se/produkt/ol/' + beer.producerName.replace(' ', '-') + '-' + beer.productNumber

  return (
    <Container>
      {/* <p>{beerData.similarity}</p> */}
      <div onClick={() => onClick(beer)}>
        <Card>
          {isGreatMatch && <Banner style={{ position: 'absolute', right: 0, top: 0, borderTopRightRadius: 20 }} />}
          <Column style={{
            backgroundColor: 'rgb(55, 55, 55)',
            cursor: 'pointer',
            padding: 20,
            height: 300,
            width: 480
          }}
          >
            <Row>
              <Center>
                <object data={imageURL} style={{ height: 200 }} type='image/png'>
                  <img style={{ height: 200 }} src={placeHolderImage} alt='Beer' />
                </object>
              </Center>
              <Content>

                <Title>
                  {beer.productNameBold}
                </Title>
                <Subtitle>
                  {beer.productNameThin}
                </Subtitle>
                <ThinTitle>
                  {beer.alcoholPercentage}%
                </ThinTitle>

                <Buy href={url} onClick={(e: any) => e.stopPropagation()} target='_blank'>Köp nu</Buy>

                <Tags>
                  {beer.categoryLevel2 !== '' && <Tag title={beer.categoryLevel2} />}
                  {beer.categoryLevel3 !== '' && <Tag title={beer.categoryLevel3} />}
                  {beer.categoryLevel4 !== '' && <Tag title={beer.categoryLevel4} />}
                </Tags>

              </Content>
            </Row>
            <Description>
              {beer.taste}
            </Description>
          </Column>
        </Card>

      </div>
    </Container>
  )
}

export default Beer
