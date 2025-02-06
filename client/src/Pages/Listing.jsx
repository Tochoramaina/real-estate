import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import {FaBed} from 'react-icons'
import {FaBath} from 'react-icons'
const Listing = () => {
    SwiperCore.use([Navigation])
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchListing = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/listing/get/${params.listingId}`)
            const data = await res.json();
            if(data.success === false){
                setError(true);
                setLoading(false)
                return;
            }
            setListing(data)
            setLoading(false)
            setError(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
       
    }
    fetchListing()
    }, [params.listingId])

  return <main>
    {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
    {error && <p className="text-center text-2xl">Something went wrong</p>}
    {listing && !loading && !error && <>
    <Swiper navigation>
        {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
                <div className="h-[550px]" style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}></div>
            </SwiperSlide>
        ))}
    </Swiper>
   
    </>}
    <div>   
           <div className="flex flex-col max-w-4xl mx-auto p-3 gap-6">
            <p className="text-2xl font-semibold">
                {listing.name} - ${' '}
                {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regulaPrice.toLocaleString('en-US')}
                {listing.type === 'rent' && ' / month'}
            </p>
           </div>

            <div className="flex gap-5">
                <p className="bg-red-600 w-full max-w-[200px text-white text-center p-1 rounded-md">
                    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {
                listing.offer && (
                    <p className="bg-green-600 w-full max-w-[200px text-white text-center p-1 rounded-md">
                        ${+listing.regulaPrice - +listing.discountPrice}
                    </p>
                )  
                }
            </div>
            <p className="text-slate-400"><span className="font-semibold text-black">Description - </span> {listing.description}</p>
            <ul className=" text-green-900 font-semibold text-sm flex items-center gap-4 sm:gap-6 flex-wrap">
                <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBed className='text-lg'>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                    </FaBed>
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBath className='text-lg'>
                        {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : `${listing.bathrooms} bathroom`}
                    </FaBath>
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBath className='text-lg'>
                        {listing.parking  ? 'Parking spot' : 'No Parking'}
                    </FaBath>
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBath className='text-lg'>
                     {listing.furnished ? 'Furnished' : 'Not Furnished'}
                    </FaBath>
                </li>
            </ul>
    </div>

  </main>
}

export default Listing