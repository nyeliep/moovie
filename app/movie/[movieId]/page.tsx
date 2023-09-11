"use client"
import { useState, useEffect } from "react";
import { getMovieDetails } from "@/app/utilities/utils";
import {usePathname} from 'next/navigation'
import { log } from "console";



const MovieDetails = ( {params}:{params:{movieId:number}}) =>{
    const [movieDetails, setMovieDetails] = useState();
    const path = usePathname();
    console.log({path});

    useEffect(()=>{
        (async()=>{
            const movieDetails = await getMovieDetails(path);
            console.log({movieDetails});

        })()

    }, [])

    return(
        <div>
<h1>hello Nyeliep</h1>
        </div>

    )
}

export default MovieDetails;