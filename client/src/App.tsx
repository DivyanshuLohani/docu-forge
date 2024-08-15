import { Route, Routes, Navigate } from "react-router-dom";
import TextEditor from "./TextEditor";
import { ObjectId } from "bson";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate replace to={`/documents/${new ObjectId().toString()}`} />
        }
      ></Route>
      <Route path="/documents/:id" element={<TextEditor />}></Route>
    </Routes>
  );
}

export default App;
