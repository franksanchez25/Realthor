import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react"
import { app } from "../firebase";


export const CreateListing = () => {

    const [Files, setFiles] = useState([]);
    const [uploadProgress, setuploadProgress] = useState(0);
    const [imageListing, setimageListing] = useState({
        imagesUrls:[]
    });
    const [uploadImageError, setuploadImageError] = useState(false);
    const [uploading, setuploading] = useState(false);

    const handleImageSubmit = (e)=> {
  
        if ( Files.length == 0 ) { 
           return setuploadImageError('Select at least 1 image!');
         }

        if (Files.length > 0 && Files.length + imageListing.imagesUrls.length < 6) {
            setuploading(true)
            const promise = [];

            for (let image = 0; image < Files.length; image++) {
                promise.push(storeImage(Files[image]));
            }
            Promise.all(promise).then((urls)=>{
                setimageListing({... setimageListing, imagesUrls: imageListing.imagesUrls.concat(urls)}
                );

                setuploadImageError(null);
                setuploading(false);
                
            }).catch(()=>{
                setuploadImageError('Image upload failed');
                setuploading(false) 
            });
            
       }else{
           setuploadImageError('You only upload 6 image per listing');
           setuploading(false) 
       }
    };


    const handleDeleteUploadedImage = (index) => {
        
        setimageListing({
            ...imageListing,
            imagesUrls: imageListing.imagesUrls.filter( (_, i) => i !== index )
        })

    }

    console.log(imageListing)
    const storeImage = async (file)=> {
        return new Promise((resolve, reject)=>{
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;

            const storageRef = ref(storage, `listings/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef,file);

            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                 setuploadProgress(Math.round(progress));
                },
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        resolve(downloadURL);
                    });
                }
            )

        } );

    }

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
            <textarea 
            className='border p-3 rounded-lg'
             name="description" placeholder='Description'  max={200} min={10}
            required
            />
            <input 
            className='border p-3 rounded-lg'
            type="text"name="address" placeholder='Address' 
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
                        onChange={(e)=> setFiles(e.target.files)}
                        name="images" id="images" accept='images/*' multiple/>

                        <button type="button" onClick={handleImageSubmit} className=' text-green-700 w-32
                        border-green-700 border rounded uppercase hover:shadow-lg disabled:opacity-80' disabled={uploading}>{uploading ? 'Uploading' : 'Upload'}</button>
                    </div>
                { 
                uploadProgress > 0 && uploadProgress < 100 ? 
                (
                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div className=" bg-slate-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" 
                  styles={{width: uploadProgress}}> { `uploading ${uploadProgress} %` }</div>
                  </div>
                ):
                uploadProgress === 100 ? 
                (
                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div className=" bg-green-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" 
                    styles={{width: uploadProgress}}>{ `uploaded ${uploadProgress} %` }</div>
                    </div>
                ):
                ''
                }
                    
                {
                    imageListing.imagesUrls.length > 0 && imageListing.imagesUrls.map( (images,index)=> (
                        
                        <div key={images} className=" flex justify-between ju text-center text-red-600 p-3 border-gray-400 border items-center">
                            <img src={images} alt="image listings" className=" w-40 h-40 object-contain rounded-lg" />
                            <button type="button" onClick={()=> handleDeleteUploadedImage(index)} className=" border border-red-600 rounded uppercase hover:shadow-lg w-24 h-10">Delete</button>
                        </div>
                   
                        ))
                }

            <button className=' p-3 bg-slate-700 text-white uppercase rounded-lg hover:opacity-95 disabled: opacity-80
             sm:'>Create Listing</button>
             <p className=" text-red-600">{uploadImageError && uploadImageError }</p>
            </div>
        </form>
    </main>
  )
}
