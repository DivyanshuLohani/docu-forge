import { Server } from "socket.io";
import { findOrCreateDocument, DocumentModel } from "../Document";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    socket.on("get-document", async (documentId: string) => {
      const document = await findOrCreateDocument(documentId);
      console.log(document);
      socket.join(document._id as string);
      socket.emit("load-document", document);
      socket.on("send-changes", (delta) => {
        socket.broadcast.to(documentId).emit("receive-changes", delta);
      });
      socket.on("save-document", async (data) => {
        await DocumentModel.findByIdAndUpdate(documentId);
      });
    });
  });
}
