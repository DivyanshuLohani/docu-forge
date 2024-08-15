import mongoose, { Document as D, Types } from "mongoose";

export interface Document extends D {
  data: Object;
}

const documentSchema = new mongoose.Schema<Document>({
  data: { type: Object },
});

const DocumentModel =
  mongoose.models.Document ||
  mongoose.model<Document>("Document", documentSchema);

const findOrCreateDocument = async (id: string): Promise<Document> => {
  // if (!Types.ObjectId.isValid(id))
  const document = await DocumentModel.findById(id);
  if (document) return document;

  const newDocument = await DocumentModel.create({
    _id: new Types.ObjectId(id),
  });
  return newDocument;
};

export { DocumentModel, findOrCreateDocument };
