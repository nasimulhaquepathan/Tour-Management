import React, { useEffect, useState } from 'react'

import { Col, Container, Row } from 'reactstrap'

import { useLocation } from 'react-router-dom'
import CommonSection from '../shared/CommonSection'
import TourCard from '../shared/TourCard'

import Newsletter from '../shared/Newsletter'

const SearchResultList = () => {

  const location = useLocation();
  const [data] = useState(location.state)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <CommonSection title={'Tour Search Result'} />
    <section>
      <Container>
        <Row>
          {
            data.length === 0? (<h4 className='text-center'>No tour found</h4> ): ( data?.map(tour=> (
              <Col lg='3' className='mb-4' key={tour._id} >
                <TourCard tour={tour} />
              </Col>
            )))
          }
        </Row>
      </Container>
    </section>

    <Newsletter/>

    </>
  )
}

export default SearchResultList