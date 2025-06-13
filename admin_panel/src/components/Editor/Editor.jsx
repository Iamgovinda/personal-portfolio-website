import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import CodeTool from "@editorjs/code";
import { patch } from '../../API/axios';
import { useNavigate } from "react-router-dom";
import ImageTool from '@editorjs/image';
import Table from '@editorjs/table';
import CodeBox from '@bomdi/codebox';
import { get } from '../../API/axios';
import { toast } from "react-toastify";
import styles from './Editor.module.scss';
import { Button } from "@mui/material";
import { YoutubeEmbed } from "editorjs-youtube-embed";


function Editor(props) {
  const navigate = useNavigate();
  const Marker = require('@editorjs/marker');
  const LinkTool = require('@editorjs/link');
  const ImageGallery = require('@rodrigoodhin/editorjs-image-gallery');
  const [data, setData] = useState();
  const [blogData, setBlogData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      get(`/blog/${props?.uuid}`).then((response) => {

        if (response.status === 200) {
          setBlogData(JSON.parse(response.data?.content));
          setIsLoading(false);
        }
      })
    }
  }, [])


  function handleSave() {
    patch('/blog/' + props?.uuid + '/', {
      "content": data
    }).then((response) => {
      if (response.status === 200) {
        toast.success("Blog Updated successfully")
        navigate('/');

      } else {
        toast.error("Somethfing went wrong.");
      }
    })

      .catch((error) => {
        console.log("Error: ", error);
      });
  }
  function handleImageUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve({
          success: 1,
          file: {
            url: data.target.result,
          },
        });
      };
      reader.readAsDataURL(file);
    });
  }

  React.useEffect(() => {
    if (blogData) {
      const config = {
        holder: "editorjs",
        focus: true,
        data: blogData,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          imageGallery: ImageGallery,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile(file) {
                  return handleImageUpload(file);
                },
                uploadByUrl(url) {
                  return Promise.resolve({
                    success: 1,
                    file: {
                      url: url,
                    },
                  });
                },
              },
            },
          },
          codeBox: {
            class: CodeBox,
            config: {
              themeURL: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css', // Optional
              themeName: 'atom-one-dark', // Optional
              useDefaultTheme: 'light' // Optional. This also determines the background color of the language select drop-down
            }
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: 'http://localhost:8008/fetchUrl'
            },
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
              },
            },
          },
          code: CodeTool,
        },
        placeholder: "Lets`s write an awesome bloog",
        logLevel: "ERROR",
        onChange: (api, event) => {
          editor.save().then((outputData) => {
            setData(JSON.stringify(outputData));

          })
        }
      }
      const editor = new EditorJS(config);
    }

  }, [blogData]);

  return (<>
    <h1 className={styles['blog-title']}>{props?.data?.title}</h1>
    <div id="editorjs" className={styles['editorjs']}>
    </div>
    <Button onClick={handleSave} className={styles["save_btn"]} variant="contained">Update</Button>
  </>
  );
}

export default Editor;
