import React, { useState } from "react";
import styles from "./Resume.module.scss";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';

// import { Chrono } from 'react-chrono';

import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ResumeSkeleton from "../../components/skeleton/ResumeSkeleton";
import cert from '../../assets/icons/cert.png';




const Resume = (props) => {
    const [tab, setTab] = useState('education');
    const handleChange1 = () => {
        setTab('education');
    }

    const handleChange2 = () => {
        setTab('experience');
    }

    return (
        <>
            <Container className={styles["container-parent"]} id="resume">
                {
                    (props?.loading) ? (
                        <>
                            <ResumeSkeleton />
                        </>
                    ) : (
                        <>
                            <p className={styles["resume-title"]}>Resume</p>
                            <hr />
                            <div className={styles['tab']}>
                                <Button className={(tab === 'education') ? `${styles['btn-1']}` : `${styles['btn-1-ex']}`} onClick={handleChange1}>My Educations</Button>
                                <Button className={(tab === 'experience') ? `${styles['btn-2']}` : `${styles['btn-2-ex']}`} onClick={handleChange2}>My Experiences</Button>
                            </div>
                            {
                                (tab === 'education') ? (
                                    <>
                                        <Timeline lineColor={'#ddd'} >
                                            {
                                                props?.data?.educations?.map((item) => {
                                                    return (
                                                        <>
                                                            <TimelineItem
                                                                key="002"
                                                                dateText={item?.period}
                                                                dateInnerStyle={{ background: '#F0F1F3', color: '#132238', border: 'none !important' }}
                                                                bodyContainerStyle={{
                                                                    background: '#ddd',
                                                                    padding: '20px',
                                                                    borderRadius: '8px',
                                                                    boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
                                                                }}
                                                            >
                                                                <h3 style={{ color: '#61b8ff' }} className={styles['heading']}>{item?.title} , {item?.institute_name}</h3>
                                                                <p className={styles['dsc']}>
                                                                    {item?.description}
                                                                </p>
                                                            </TimelineItem>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Timeline>
                                    </>
                                ) : (
                                    <>
                                        <Timeline lineColor={'#ddd'} >
                                            {
                                                props?.data?.experiences?.map((item) => {
                                                    return (
                                                        <>
                                                            <TimelineItem
                                                                key="002"
                                                                dateText={item?.period}
                                                                dateInnerStyle={{ background: '#F0F1F3', color: '#132238', border: 'none !important' }}
                                                                bodyContainerStyle={{
                                                                    background: '#ddd',
                                                                    padding: '20px',
                                                                    borderRadius: '8px',
                                                                    boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
                                                                }}
                                                            >
                                                                <h3 style={{ color: '#61b8ff' }} className={styles['heading']}>{item?.title} , {item?.company_name}</h3>
                                                                <p className={styles['dsc']}>
                                                                    {item?.description}
                                                                </p>
                                                            </TimelineItem>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Timeline>
                                        </>)}
                                        <p className={styles["certificate"]}>Certificates</p>
                                        <Row>
                                            {
                                                props?.data?.certificates && props?.data?.certificates?.map((item, index) => {
                                                    return <>
                                                        <Col lg={6} key={index}>
                                                            <a
                                                                href={item?.link}
                                                                target="_blank"
                                                                style={{ textDecoration: "none" }}
                                                                rel="noopener noreferrer"
                                                            >
                                                                <div className={styles["cert-parent"]} onClick={()=>{
                                                                    window.open(item?.link, "_blank");
                                                                }}>
                                                                    {/* <img src="https://www.sololearn.com/Certificate/CT-BEND7IBK/jpg" alt="certi-img"/> */}
                                                                    <div className={styles["cert-img-box"]}>
                                                                        <img
                                                                            src={item?.image?.file ?? cert}
                                                                            alt="certi-img"
                                                                            className={styles["cert-img"]}
                                                                        />
                                                                    </div>
                                                                    <div className={styles["cert-content"]}>
                                                                        <div>
                                                                            <p className={styles["certificate-name"]}>
                                                                                {item?.name}
                                                                            </p>
                                                                        </div>
                                                                        <div className={styles["certificate-id"]}>
                                                                            Certification ID: {item?.certificate_id}
                                                                        </div>
                                                                        <div className={styles["certificate-id"]}>{item?.certification_date}</div>
                                                                        <div className={styles["certificate-id"]}>
                                                                            Certification Agency: {item?.agency}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </Col>
                                                    </>
                                                })
                                            }
                                        </Row>
                                        <Row style={{ marginTop: "1.5rem" }}>
                                            <p className={styles["skills"]}>Skills</p>
                                            {
                                                props?.data?.skills?.map((item, index) => {
                                                    return <Col lg={3} md={6} sm={6} xs={6} key={index}>
                                                        <div className={styles["skill-box"]}>
                                                            <CircularProgressbar value={item?.skill_rate} text={`${item?.skill_rate}%`} backgroundPadding={0} styles={buildStyles({
                                                                pathColor: '#250994',
                                                                textColor: '#132238'
                                                            })} strokeWidth={10} trailColor={'#d6d6d6'} />
                                                            <p className={styles['skill-name']}>{item?.title}</p>
                                                        </div>
                                                    </Col>
                                                })
                                            }
                                        </Row>
                                    </>
                                )
                            }
            </Container>
        </>
    );
};

export default Resume;
