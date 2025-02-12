
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle';
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper'
import ListingItems from '../Components/ListingItems';

const Home = () => {
  const [offerListings, setOfferlistings] =useState([]);
  const [saleListings, setSalelistings] = useState([]);
  const [rentListings, setRentlistings] = useState([]);
  SwiperCore.use([Navigation])
  useEffect(() => {
    const fetchOfferlistings = async() => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferlistings(data)
        fetchRentlistings();
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentlistings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentlistings(data)
        fetchSalelistings();
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSalelistings = async() => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setSalelistings(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferlistings();

  }, [])
  return (
    <div>
       <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find yor next <span className='text-slate-500'>perfect</span>
        <br/>
        Place with ease</h1>
        <div className="text-gray-500 text-xs sm:text-sm">
          Maina Estate is the best place to find your next perfect 
          place to live
          <br/>
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
        Letss get started....
        </Link>
       </div>
      <Swiper navigation>
        {offerListings && offerListings > 0 &&
        offerListings.map((listing) => {
          <SwiperSlide>
            <div style={{background : `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover'}}
             className='h-[500px]' key={listing._id}></div>
          </SwiperSlide>
        })
        }
      </Swiper>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 && (
            <div className='my-3'>
              <div className=''>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to = "/search?offer=true">Show more offers</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  offerListings.map((listing) => {
                    <ListingItems listing={listing} key={listing._id}/>
                  })
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className='my-3'>
              <div className=''>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to = "/search?type=rent">Show more places for rent</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  rentListings.map((listing) => {
                    <ListingItems listing={listing} key={listing._id}/>
                  })
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className='my-3'>
              <div className=''>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                <Link className='text-sm text-blue-800 hover:underline' to = "/search?type=sale">Show more places for sale</Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  saleListings.map((listing) => {
                    <ListingItems listing={listing} key={listing._id}/>
                  })
                }
              </div>
            </div>
          )
        }
        
      </div>
    </div>
  )
}

export default Home