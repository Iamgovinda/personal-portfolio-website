import React from 'react';
import styles from './Contact.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { useForm } from "react-hook-form";
import { post } from '../../API/axios';
import { toast } from 'react-toastify';
const Contact = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        post(`/contact/`, data).then((response) => {
            if (response.status === 201) {
                toast.success("Submitted Successfully");
                reset();
            }
        })
    };
    return (
        <>
            <Container className={styles['contact-parent']} id='contact'>
                <Row>
                    <Col lg={6}>
                        <p className={styles['text-1']}>Let’s discuss your Project</p>
                        {/* <p className={styles['text-2']}>There are many variations of passages of Lorem Ipsu available. but the majority have suffered alte.</p> */}
                        <div className={styles['info-box']}>
                            <div className={styles["info-icon"]}>

                                <Icon icon="material-symbols:location-on-outline" style={{ color: 'white' }} />
                            </div>
                            <div className="info-text">
                                <p className={styles['info-text-1']}>Address: </p>
                                <p className={styles['info-text-2']}>{props?.data?.address}</p>
                            </div>
                        </div>
                        <div className={styles['info-box']}>
                            <div className={styles["info-icon"]}>
                                <Icon icon="ic:outline-email" style={{ color: 'white' }} />
                            </div>
                            <div className="info-text">
                                <p className={styles['info-text-1']}>My Email: </p>
                                <p className={styles['info-text-2']}>{props?.data?.email}</p>
                            </div>
                        </div>
                        <div className={styles['info-box']}>
                            <div className={styles["info-icon"]}>
                                <Icon icon="material-symbols:phone-android-outline-rounded" style={{ color: 'white' }} />
                            </div>
                            <div className="info-text">
                                <p className={styles['info-text-1']}>Call Me Now: </p>
                                <p className={styles['info-text-2']}>{props?.data?.phone}</p>
                            </div>
                        </div>

                        <div className={styles["connections"]}>
                            <div className={styles["connections-icon-box"]}>
                                <a href={props?.data?.social_links?.facebook}
                                    target="_blank"
                                    style={{ textDecoration: "none" }}
                                    rel="noopener noreferrer"
                                >
                                    <Icon icon="basil:facebook-outline" className={styles['icons']} />
                                </a>
                            </div>
                            <div className={styles["connections-icon-box"]}>
                                <a href={props?.data?.social_links?.youtube}
                                    target="_blank"
                                    style={{ textDecoration: "none" }}
                                    rel="noopener noreferrer"
                                >
                                    <Icon icon="lucide:youtube" className={styles['icons']} />
                                </a>
                            </div>
                            <div className={styles["connections-icon-box"]}>
                                <a href={props?.data?.social_links?.linkedln}
                                    target="_blank"
                                    style={{ textDecoration: "none" }}
                                    rel="noopener noreferrer"
                                >
                                    <Icon icon="ion:logo-linkedin" className={styles['icons']} />
                                </a>
                            </div>
                            <div className={styles["connections-icon-box"]}>
                                <a href={props?.data?.social_links?.instagram}
                                    target="_blank"
                                    style={{ textDecoration: "none" }}
                                    rel="noopener noreferrer"
                                >
                                    <Icon icon="lucide:instagram" className={styles['icons']} />
                                </a>
                            </div>
                            <div className={styles["connections-icon-box"]}>
                                <a href={props?.data?.social_links?.twitter}
                                    target="_blank"
                                    style={{ textDecoration: "none" }}
                                    rel="noopener noreferrer"
                                >
                                    <Icon icon="teenyicons:twitter-outline" className={styles['icons']} />
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <p className={styles['text-2']}>You are welcomed to contact me through this form. I'll be happy to get in touch with you</p>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={12}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" placeholder="Name*" className={styles['input-box']} {...register("name")} />
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="email" placeholder="Email*" className={styles['input-box']} {...register("email")} />
                                    </Form.Group>
                                </Col>
                                <Col lg={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" placeholder="Location" className={styles['input-box']} {...register("location")} />
                                    </Form.Group>
                                </Col>
                                <Col lg={8}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="number" placeholder="Budget*" className={styles['input-box']} {...register("budget")} />
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" placeholder="Subject*" className={styles['input-box']} {...register("subject")} />
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control as={'textarea'} type="text" placeholder="Message*" className={styles['input-box']} {...register("message")} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Button className={styles['input-btn']} type='submit'>
                                        Submit <span><Icon icon="material-symbols:send-outline" /></span>
                                    </Button>
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Contact