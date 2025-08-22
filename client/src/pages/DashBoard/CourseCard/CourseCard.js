import { Button, Divider } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './CourseCard.module.css'
import LazyLoad from 'react-lazyload';


const CourseCard = ({title,name,id,img}) => {
    const handleClick = () => {
        console.log('CourseCard clicked:', { title, name, id, img });
    };
    
    // Validate that we have a valid id
    if (!id) {
        console.warn('CourseCard: No id provided', { title, name, id, img });
        return null;
    }
    
    return (
        <LazyLoad height={200} offset={100} once={true} >
        <Link to={`/course/${id}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleClick}>
            <div className={Styles.course__Card}>
                <div className={Styles.container}>
                    <img className={Styles.image} src={img}alt=""/>
                    <div className={Styles.overlay}>
                        <p className={Styles.text}>View Course</p>
                    </div>
                </div>
                
                <div className={Styles.course__content}>
                    <span>Jan-Jun 2021</span>
                    <h5>{name}</h5>
                    <h5>{title}</h5>
                    <Button 
                        color='primary' 
                        variant="contained"
                        style={{ textDecoration: 'none' }}
                    >
                        View Course
                    </Button><br/>
                    <span>This is a course template which is to be used as the course kit for the teachers.</span>
                </div>
            </div>
        </Link>
        <Divider/>
        </LazyLoad>
    );
};

export default CourseCard;