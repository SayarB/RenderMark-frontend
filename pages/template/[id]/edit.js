import { useRouter } from "next/router";
import { marked } from "marked";
import { parse } from "node-html-parser";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import styles from "../../../styles/EditMarkdown.module.css";
import Button from "../../../components/Button/Button";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const initialMD = `# A Promo Video

## Scenes:
  
### Scene 1:

< Your Text Goes Here  >

< Image link goes here >
  
### Scene 2:
  
< Your Text Goes Here >
  
< Image link goes Here >
`;

export default function EditMarkdownForTemplate() {
  const router = useRouter();
  const { id } = router.query;
  const [showPreview, setShowPreview] = useState();
  const [json, setJson] = useState({});
  const [parseDone, setParseDone] = useState(false);
  const [error, setError] = useState("");
  const [imagesUploaded, setImagesUploaded] = useState([]);
  const [value, setValue] = useState(initialMD);

  const onImageClick = (src) => {
    insertAtPosition(src);
  };
  const insertAtPosition = (text) => {
    const textarea = document.getElementsByClassName(
      "w-md-editor-text-input"
    )[0];
    const posStart = textarea.selectionStart;
    const posEnd = textarea.selectionEnd;
    setValue((val) => {
      return val.substring(0, posStart) + text + val.substring(posEnd);
    });
  };

  const pasteHandler = (e) => {
    for (const element of e.clipboardData.items) {
      let item = element;
      console.log(item.type);
      if (item.type.indexOf("image") != -1) {
        let blob = item.getAsFile();

        uploadImage(blob);
      }
    }
  };

  function uploadImage(blob) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        console.log("SUCCESS", xhr.responseText);
        insertAtPosition(xhr.responseText);
      } else {
        console.warn("request_error");
      }
    };

    xhr.open("POST", "https://3vvbi8.deta.dev/FileUploader", false);
    xhr.setRequestHeader("Content-Type", blob.type);
    xhr.send(blob);
  }

  const togglePreview = useCallback(() => {
    setShowPreview(!showPreview);
  }, [showPreview]);
  const showJson = (value) => {
    const html = marked.parse(value);
    console.log(html);
    const dom = parse(html);

    const title = dom.querySelector("h1").innerText;
    setJson((json) => ({ ...json, templateid: id, title }));
    setJson((json) => ({ ...json, scenes: [] }));
    const scenesArray = [];
    try {
      Array.from(dom.querySelectorAll("h3")).forEach((ele, i) => {
        const textContent = ele.textContent.trimEnd();
        if (textContent.includes("Scene") || textContent.includes("scene")) {
          const splitText = textContent.split(" ");
          console.log(splitText);
          if (
            splitText.length !== 2 ||
            !splitText[1].endsWith(":") ||
            isNaN(parseInt(splitText[1].substring(0, splitText[1].length - 1)))
          ) {
            throw new Error(
              "Scene number is should be specified in the format Scene <scene-number>:"
            );
          }

          const index = parseInt(
            splitText[1].substring(0, splitText[1].length - 1)
          );
          if (index > scenesArray.length + 1) throw new Error("Out of Bounds");
          const nextChild = ele.nextElementSibling;
          if (!nextChild) {
            throw new Error("Scene " + index + " is not specified correctly");
          }

          const text = nextChild?.innerHTML;
          if (
            !nextChild.nextElementSibling ||
            !nextChild.nextElementSibling.firstChild ||
            !nextChild.nextElementSibling.firstChild.getAttribute
          ) {
            throw new Error(
              "Image is not specified properly in scene " +
                index +
                ":  Remember to give a line gap after text"
            );
          }
          const img =
            nextChild.nextElementSibling.firstChild.getAttribute("src");
          console.log(index);
          scenesArray[index - 1] = { text, img };
        }
      });
      setJson((json) => {
        return { ...json, scenes: scenesArray };
      });
      setParseDone(true);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (parseDone === true) {
      console.log(json);
    }
  }, [parseDone, json]);

  return (
    <>
      {parseDone ? <p>{JSON.stringify(json)}</p> : ""}
      <div className={styles["edit-container"]}>
        <div data-color-mode="dark" className={styles["markdown-editor"]}>
          <h1>{id}</h1>
          <Button
            style={{ marginBottom: "2rem" }}
            bgColor="#eeeeee"
            onClick={togglePreview}
          >
            {showPreview ? "Editor" : "Preview"}
          </Button>
          <MDEditor
            onPaste={pasteHandler}
            preview={showPreview ? "preview" : "edit"}
            height={600}
            value={value}
            onChange={(e) => {
              setError("");
              setValue(e);
            }}
          />
          <Button
            style={{ marginTop: "2rem" }}
            bgColor="#10ce20"
            onClick={() => showJson(value)}
          >
            Submit
          </Button>
          <p style={{ color: "red", fontSize: "2rem" }}>{error}</p>
        </div>
      </div>
    </>
  );
}
