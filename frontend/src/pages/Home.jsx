import { Helmet } from 'react-helmet-async'
import HeroBanner from '../components/HeroBanner'
import BookingForm from '../components/BookingForm'
import PopularRoutes from '../components/PopularRoutes'
import FleetShowcase from '../components/FleetShowcase'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import Gallery from '../components/Gallery'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Namasvi Cab Services | Premium Cab Booking in Maharashtra</title>
      </Helmet>
      <HeroBanner />
      <BookingForm />
      <PopularRoutes />
      <FleetShowcase />
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
    </>
  )
}
