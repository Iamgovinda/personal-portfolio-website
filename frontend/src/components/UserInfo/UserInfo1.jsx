import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import MyButton from "../Button/Button";
import styles from './UserInfo1.module.scss';
import userImg from '../../assets/UserInfo/user1.jpg';
import UserInfoCard from "./UserInfoCard";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import UserInfo1Skeleton from "../skeleton/UserInfo1Skeleton";
// import { TypeAnimation } from 'react-type-animation';
const UserInfo1 = (props) => {
    return (
        <Container>
            {
                (props?.loading) ? (
                    <>
                        <UserInfo1Skeleton />
                    </>
                ) : (
                    <>
                        <Row className={styles['parent']}>
                            <Col md={7} lg={7} className={styles['left']}>
                                <div>
                                    <p className={styles['text-1']}>Hello, I’m {props?.data[0]?.name}</p>
                                    <p className={styles['text-2']}>
                                        {props?.data[0]?.description}
                                    </p>
                                    <MyButton txt="Say Hello" email={props?.data[0]?.email} text='user info 1' />

                                </div>
                                
                    <div className={styles['user-data-box']}>
                        <div style={{ padding: '10px' }} className={styles['user-data']}>
                            <div className={styles['user-data-common']}>
                                <p className={styles['user-common-text']}>{props?.data[0]?.experience} Y.+</p>
                                <p className={styles['user-text']}>Experience</p>
                            </div>
                            <div className={styles['user-data-common']}>
                                <p className={styles['user-common-text']}>{props?.data[0]?.project_completed}+</p>
                                <p className={styles['user-text']}>Project Completed</p>
                            </div>
                            <div className={styles['user-data-common']}>
                                <p className={styles['user-common-text']}>{props?.data[0]?.happy_client}+</p>
                                <p className={styles['user-text']}>Happy Clients</p>
                            </div>
                        </div>
                    </div>
                            </Col>
                            <Col md={5} lg={5} className={styles['col-right']}>
                                <img src={props?.data[0]?.main_image?.file ?? userImg} alt="user-img" className={styles['user-img']} />
                                <div className={styles['gradient-1']}></div>
                            </Col>
                        </Row>
                    </>
                )
            }
            <UserInfoCard about={props?.data[0]} loading={props?.loading} />
        </Container>
    );
};

export default UserInfo1;
