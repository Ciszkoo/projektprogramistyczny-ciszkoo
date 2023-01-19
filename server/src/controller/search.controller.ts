import { Request, Response } from "express";
import { SearchInput } from "../schema/search.schema";
import { search } from "../service/search.service";

export const searchController = async (
  req: Request<{}, {}, {}, SearchInput>,
  res: Response
) => {
  const { query } = req.query;
  const id = req.session.passport?.user as string;

  const result = await search(id, query.toLowerCase());
  if (!result) {
    return res.status(404).send({ err: "Could not find users" });
  }
  return res.status(200).send(result);
};
