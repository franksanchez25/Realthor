
import React from 'react'

export const CreateListing = () => {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className=' text-3xl font-semibold text-center my-7 '>Create a Listing</h1>
        <form className=' flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input 
            className='border p-3 rounded-lg'
            type="text"name="title" placeholder='Title'  max={80} min={10}
            required
            />
            <input 
            className='border p-3 rounded-lg'
            type="text"name="description" placeholder='description'  max={200} min={10}
            required
            />
            <input 
            className='border p-3 rounded-lg'
            type="text"name="address" placeholder='address' 
            required
            />
            <div className=' flex gap-6 flex-wrap'>
                <div className='flex gap-2'>
                    <input type="checkbox" name="sale" id="sale" className='w-5'/>
                    <span>Sell</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" name="Rent" id="Rent" className='w-5'/>
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" name="parking" id="parking" className='w-5'/>
                    <span>Parking Spot</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" name="furnished" id="furnished" className='w-5'/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" name="offer" id="offer" className='w-5'/>
                    <span>Offer</span>
                </div>

            </div>

            <div className=' flex flex-wrap gap-6'>
                <div className='flex items-center gap-2'>
                    <input className='p-3 border border-gray-300 rounded-lg' type="number" name="bedRooms" id="bedRooms" />
                    <p>Bedrooms</p>
                </div>
                <div className='flex items-center gap-2'>
                    <input className='p-3 border border-gray-300 rounded-lg' type="number" name="bathRooms" id="bathRooms" />
                    <p>Bathrooms</p>
                </div>
                <div className='flex items-center gap-2'>
                    <input className='p-3 border border-gray-300 rounded-lg' type="number" name="regularPrice" id="regularPrice" />
                        <div className=' flex flex-col items-center'>
                        <p>Regular price</p>
                        <span className=' text-xs'>($ / month)</span>
                        </div>
                </div>
                <div className='flex items-center gap-2'>
                    <input className='p-3 border border-gray-300 rounded-lg' type="number" name="discountedPrice" id="discountedPrice" />
                     <div className=' flex flex-col items-center'>
                    <p>Discounted price</p>
                    <span className=' text-xs'>($ / month)</span>
                    </div>
                </div>
            </div>

        </div>
            <div className=' flex flex-col flex-1 gap-2'>
                <p className=' font-semibold'>Images:
                <span className=' font-normal text-gray-500 ml-2'>The first image will be the cover (Max 6)</span>
                </p>
                    <div className='flex gap-3'>
                        <input className='p-3 border-gray-300  border rounded w-full' type="file" 
                        name="images" id="images" accept='images/*' multiple/>
                        <button className=' text-green-700 w-32
                        border-green-700 border rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                    </div>
            <button className=' p-3 bg-slate-700 text-white uppercase rounded-lg hover:opacity-95 disabled: opacity-80
             sm:'>Create Listing</button>
            </div>
        </form>
    </main>
  )
}
