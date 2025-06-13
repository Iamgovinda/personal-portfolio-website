import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

import { Container } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlogCard from '../../components/BlogCard/BlogCard';
import { get } from '../../API/axios';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './BlogLayout.scss';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BlogSkeleton from '../../components/skeleton/BlogSkeleton';



function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
const BlogLayout = (props) => {
    const [blog, setBlog] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (isLoading) {
            get(`/blog/`, {username: process.env.REACT_APP_USER_USERNAME}).then((response) => {
                if (response.status === 200) {
                    setBlog(response.data?.results);
                    setIsLoading(false);
                }
            })
        }
    }, [isLoading])
    const settings = {
        dots: false,
        infinite: blog?.length > 4,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 500,
        centerMode: false,
        autoplaySpeed: 3000,
        nextArrow: <Icon icon="material-symbols:arrow-circle-right" color='#132238' fontSize={'lg'} />,
        prevArrow: <Icon icon="material-symbols:arrow-circle-left-sharp" color='#132238' fontSize={'lg'} />,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Container id='blog' className='blog'>{
            (isLoading) ? (
                <>
                    <Skeleton width={'8rem'} height={'3rem'} />
                    <hr />
                    <BlogSkeleton />
                </>
            ) :
                (
                    <>

                        {
                            (blog && blog.length > 0) && (<>
                                <div className='blog-title'>
                                    <p>Blogs</p>
                                    {
                                        (blog?.length > 4) && <Link className={'view-all'} to='/all-blogs'>view all</Link>
                                    }
                                </div>
                                <Slider {...settings}>
                                    {
                                        blog?.map((item, index) => {
                                            return (
                                                <>
                                                    <BlogCard key={index} data={item} />
                                                </>
                                            )
                                        })
                                    }
                                </Slider>
                            </>)
                        }
                    </>
                )
        }
        </Container>
    )
}

export default BlogLayout