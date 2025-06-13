import React, { useState } from 'react';
import Output from 'editorjs-react-renderer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../API/axios';
import { Container } from 'react-bootstrap';
import styles from './BlogView.module.scss';
import { Icon } from '@iconify/react';
const BlogView = (props) => {
  const [blog, setBlog] = useState([]);
  const [blogData, setBlogData] = useState();
  const { uuid } = useParams();
  useEffect(() => {
    get(`/blog/${uuid}/`).then((response) => {
      if (response.status === 200) {
        setBlog(response?.data);
        setBlogData(JSON.parse(response?.data?.content));
      }
    })
    //eslint-disable-next-line
  }, [])
  return (
    <>
      <Container className={styles['container']}>
        <h1 className={styles["top"]}>
          {blog?.title}
        </h1>
        <hr />
        <p className={styles['blog-info']}><Icon icon="mdi:fountain-pen-tip"  style={{ fontSize: '1.6rem', fontWeight: 'bold' }} /> {blog?.written_by + ' | ' + blog?.publish_date}</p>
        <hr />
        <div className={styles["content"]}>
          <Output data={blogData ?? "dfsk"} className={styles['output']} />
        </div>
      </Container>
    </>
  )
}

export default BlogView