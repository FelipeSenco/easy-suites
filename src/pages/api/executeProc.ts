import { SqlTypes } from "@/app/enums/enums";
import { SqlServerRepository } from "@/repository/SqlServerRepository";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  if (req.method === "POST") {
    try {
      // Assuming your connection string is stored in an environment variable
      const repository = new SqlServerRepository(process.env.CONNECTION_STRING as string);

      const { procName, parameters } = req.body;

      // Validate procName and parameters if necessary

      const result = await repository.executeStoredProcedure(procName, parameters);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : "An error occurred",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
