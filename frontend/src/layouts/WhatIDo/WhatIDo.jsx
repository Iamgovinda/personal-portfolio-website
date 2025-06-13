import React from 'react';
import { Row, Col, Container, Stack, Button } from 'react-bootstrap';
import styles from './WhatIDo.module.scss';
import MyButton from '../../components/Button/Button';
// import { useState, useEffect } from 'react';
// import { get } from '../../API/axios';
import WIDSkeleton from '../../components/skeleton/WIDSkeleton';
const WhatIDo = (props) => {
    const whatIDo = props?.what_i_do_items || [];
    const isLoading = props?.loading || false;
    
    return (
        <div className={styles['parent']}>

            <Container>
                {
                    (isLoading) ? (<>
                        <WIDSkeleton />
                    </>) : (
                        <>
                            <Row gap={2} className={styles["grid-row"]}>
                                <Col lg={6} className={styles['col-right']}>
                                    <p className={styles['wid-title']}>
                                        What I do
                                    </p>
                                    <p className={styles['wid-desc']}>
                                        {props?.what_i_do_desc}
                                    </p>
                                    <MyButton txt="Say Hello" email={props?.email} style={{ marginTop: '1rem' }} text='from whatido' />
                                </Col>
                                <Col lg={6} className={styles['col-left']}>
                                    <Stack style={{ gap: '1rem' }}>
                                        {
                                            whatIDo.map((item, index) => {
                                                return (
                                                    <div className={styles['wid-box']} key={index}>
                                                        <p className={styles['wid-title']}>{item.title}</p>
                                                        <p className={styles['wid-desc']}>{item.desc}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Stack>
                                </Col>
                            </Row>
                        </>
                    )
                }
            </Container>
        </div>
    )
}

export default WhatIDo