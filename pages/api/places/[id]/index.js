import Place from "@/db/models/Place";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }
  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    return response.status(200).json(place);
  } else if (request.method === "PATCH") {
    const placeToUpdate = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    return response.status(200).json(placeToUpdate);
  } else if (request.method === "DELETE") {
    const placeToDelete = await Place.findByIdAndDelete(id);
    return response.status(200).json(placeToDelete);
  } else {
    return response.status(405).json({ message: "method not allowed" });
  }
}
