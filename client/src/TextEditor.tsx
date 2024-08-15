import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import { socket } from "./socket";
import { Delta, EmitterSource } from "quill/core";
import { useParams } from "react-router-dom";

export default function TextEditor() {
  const [quill, setQuill] = useState<Quill>();
  const params = useParams();
  console.log(params);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: Delta, _oldDelta: Delta, source: EmitterSource) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", params.id);
  }, [quill, params.id]);

  const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      // modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
}
