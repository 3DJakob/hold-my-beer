import React from 'react'
// @ts-expect-error
import styled from 'styled-components'
import { BeerStruct } from '../utils/typings'

// @ts-expect-error
import Card from 'react-animated-3d-card'
import Tag from './Tag'

export interface BeerProps {
  beer: BeerStruct
  onClick: (beer: BeerStruct) => void
}

const Container = styled.div`
  margin: 50px;
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

const placeHolderImage = 'https://cdn.systembolaget.se/492c4d/contentassets/ef797556881d4e20b334529d96b975a2/placeholder-wine-bottle.png'

const Beer: React.FC<BeerProps> = ({ beer, onClick }) => {
  const url = 'https://product-cdn.systembolaget.se/productimages/' + beer.productId + '/' + beer.productId + '_400.png'
  console.log(beer.categoryLevel4)
  return (
    <Container>
      <Card
        style={{
          backgroundColor: 'rgb(55, 55, 55)',
          cursor: 'pointer',
          padding: 20,
          height: 300,
          width: 480
        }}
        shineStrength={0.2}
        onClick={() => onClick(beer)}
      >
        <Column>
          <Row>

            <Center>
              <object data={url} style={{ height: 200 }} type='image/png'>
                <img style={{ height: 200 }} src={placeHolderImage} alt='Stack Overflow logo and icons and such' />
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
    </Container>
  )
}

export default Beer
