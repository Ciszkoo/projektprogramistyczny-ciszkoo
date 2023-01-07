import { Request, Response } from "express";
import { SearchInput } from "../schema/search.schema";
import { search } from "../service/search.service";
import { pick } from "lodash";

export const searchController = async (
  req: Request<{}, {}, SearchInput>,
  res: Response
) => {
  const { query } = req.body;

  try {
    const result = await search(query.toLowerCase());
    const pickedRes = result.map((user) =>
      pick(user, ["firstName", "lastName", "id"])
    );
    return res.send(pickedRes);
  } catch (error) {
    return res.status(404).send({ err: "Could not find users" });
  }
};
