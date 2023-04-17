import React, { useState, useEffect, useRef } from 'react'
import Images from './Images'
import '../css/Middle.css'

export default function MiddleByLoding() {
    const [loading, setLoading] = useState(false);
    const mounted = useRef(false);
    const [Input, setInput] = useState('nature')
    const [AllImages, setAllImages] = useState([])
    let [Current, setCurrent] = useState(1)
    const [newImages, setNewImages] = useState(false);

    const MainFetch = async () => {
        setLoading(true);
        let url;
        if (Input) {
            url = `https://api.unsplash.com/search/photos?client_id=Bb-6szc-iyrTPIG_IFgEl2Rt3-HiUOLaOVA0bfbKJQU&page=${Current}&query=${Input}`;
        } else {
            url = `https://api.unsplash.com/search/photos?client_id=Bb-6szc-iyrTPIG_IFgEl2Rt3-HiUOLaOVA0bfbKJQU&page=${Current}`;
        }
        let TempImg = []
        // await fetch(`https://api.unsplash.com/search/photos?client_id=Bb-6szc-iyrTPIG_IFgEl2Rt3-HiUOLaOVA0bfbKJQU&page=${Current}&query=${Input}`)
        //   .then(response => response.json())
        //   .then(data => {
        //     for (let i of data.results) {
        //       TempImg.push(i.urls.raw)
        //     }
        //     setAllImages(TempImg)
        //     Pages = []
        //     for (let i = 1; i < (data.total_pages) + 1; i++) {
        //       Pages.push(i)
        //     }
        //     setPages(Pages)
        //   })
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (Input && Current === 1) {
                setAllImages((old) => {
                    for (let i of data.results) {
                        TempImg.push(i.urls.raw)
                    }
                    return TempImg;
                })
            } else if (Input) {
                setAllImages((old) => {
                    for (let i of data.results) {
                        TempImg.push(i.urls.raw)
                    }
                    return [...old, ...TempImg];
                })
            } else {
                setAllImages((old) => {
                    return [...old, ...data]
                })
            }
            setNewImages(false);
            setLoading(false)
        } catch (error) {
            setNewImages(false);
            setLoading(false)
        }
    }

    useEffect(() => {
        MainFetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Current, Input])


    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            return;
        }
        if (!newImages) return;
        if (loading) return;
        setCurrent((old) => old + 1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newImages]);

    const event = () => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
            setNewImages(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', event);
        return () => window.removeEventListener('scroll', event);
    }, []);

    const SearchSubmit = (e) => {
        e.preventDefault();
        if (document.getElementById('SearchInput').value === '') {
            alert('Input Field Must Be Non-Empty!!')
        } else {
            setInput(document.getElementById('SearchInput').value)
            document.getElementById('SearchInput').value = ''
        }
    }

    return (
        <>
            <div className='Middle'>
                <div className='SearchMain'>
                    <form onSubmit={SearchSubmit}>
                        <input type='text' id='SearchInput'
                            autoComplete='off' placeholder='Search By Key Word' aria-label="lorem ipsum"
                        />
                    </form>
                </div>
                {
                    (AllImages.length > 0) ?
                        (<Images Name={Input} images={AllImages} found='grid' notfound='none'
                        />) :
                        (<Images Name={Input} images={AllImages} found='none' notfound='flex'
                        />)
                }
            </div>
        </>
    )
}
